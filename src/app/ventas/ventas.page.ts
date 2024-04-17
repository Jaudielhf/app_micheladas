import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  ventas: any[] = [];
  ip: string = '192.168.1.192';

  constructor(private router: Router, private http: HttpClient, private navCtrl: NavController, private alertController: AlertController) {}

  ngOnInit() {
    this.listaventas();
  }

  listaventas() {
    this.http.get<any[]>('http://' + this.ip + '/servicios/listaventas.php').subscribe(
      (res) => {
        console.log(res);
        this.ventas = res;
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
            this.http.get('http://' + this.ip + '/servicios/delventa.php?id_detalle=' + mat).subscribe(
              (res) => {
                console.log(res);
                this.listaventas();
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

  goToAbout(){
    this.router.navigateByUrl('/addproducto');
  }

  Logout() {
    this.router.navigateByUrl('/login');
  }
}
