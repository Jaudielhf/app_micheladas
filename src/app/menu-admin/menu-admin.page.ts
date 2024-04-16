import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.page.html',
  styleUrls: ['./menu-admin.page.scss'],
})
export class MenuAdminPage implements OnInit {
  nuevo: boolean = false;
  productos: any[] = [];
  txtma: number = 0;
  txtnm: string = '';
  txtca: string = '';
  txtgr: number = 0;
  ip: string = '192.168.20.73';

  constructor(private router: Router, private http: HttpClient, private navCtrl: NavController, private alertController: AlertController) {}

  ngOnInit() {
    this.listaproductos();
  }

  listaproductos() {
    this.http.get<any[]>('http://' + this.ip + '/servicios/listaarticulos.php').subscribe(
      (res) => {
        console.log(res);
        this.productos = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async EliminarProducto(mat: string) {
    const confirmAlert = await this.alertController.create({
      message: '¿Estás seguro de eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.http.get('http://' + this.ip + '/servicios/delarticulo.php?id_producto=' + mat).subscribe(
              (res) => {
                console.log(res);
                this.listaproductos();
                this.presentAlert('Producto eliminado correctamente');
              },
              (error) => {
                console.log(error);
                this.presentAlert('Error al eliminar el producto');
              }
            );
          }
        }
      ]
    });
  
    await confirmAlert.present();
  }
  
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  EditarProducto(id: string) {
    this.http.get('http://' + this.ip + '/servicios/busarticulo.php?id_producto=' + id).subscribe(
      (res: any) => {
        console.log(res);
        this.navCtrl.navigateForward(['/addproducto'], {
          queryParams: {
            id: res[0].id_producto,
            nombre: res[0].nombre,
            descripcion: res[0].descripcion,
            precio: res[0].precio
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
    
  goToProfile() {

  }

  goToAbout(){
    this.router.navigateByUrl('/addproducto');
  }

  Logout() {
    this.router.navigateByUrl('/login');
  }
}
