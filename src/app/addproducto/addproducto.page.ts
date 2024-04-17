import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from './model/Producto';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addproducto',
  templateUrl: './addproducto.page.html',
  styleUrls: ['./addproducto.page.scss'],
})
export class AddproductoPage implements OnInit {
  txtma: number = 0;
  txtnm: string = '';
  txtca: string = '';
  txtgr: number = 0;
  ip: string = '192.168.1.172';
  nuevo: boolean = true;

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        // Si hay parámetros de consulta, significa que se está editando un producto existente
        this.txtma = +params['id']; // Convierte a número
        this.txtnm = params['nombre'] || '';
        this.txtca = params['descripcion'] || '';
        this.txtgr = +params['precio']; // Convierte a número
        this.nuevo = false; // Establece el modo de edición
      }
    });
  }

  saveProducto() {
    const producto = new Producto(this.txtma, this.txtnm, this.txtca, this.txtgr);
    this.http.post(`http://${this.ip}/servicios/addarticulo.php`, producto).subscribe(
      (res) => {
        console.log(res);
        this.presentAlert('Producto agregado correctamente');
        this.resetFields();
      },
      (error) => {
        console.error('Error al agregar producto:', error);
        this.presentAlert('Error al agregar producto');
      }
    );
  }

  upProducto() {
    const producto = new Producto(this.txtma, this.txtnm, this.txtca, this.txtgr);
    this.http.post(`http://${this.ip}/servicios/moarticulo.php`, producto).subscribe(
      (res) => {
        console.log(res);
        this.presentAlert('Producto actualizado correctamente');
        this.resetFields();
        this.router.navigateByUrl('/menu-admin');
      },
      (error) => {
        console.error('Error al actualizar producto:', error);
        this.presentAlert('Error al actualizar producto');
      }
    );
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  resetFields() {
    this.txtma = 0;
    this.txtnm = '';
    this.txtca = '';
    this.txtgr = 0;
    this.nuevo = true; // Cambiar a modo de agregar nuevo producto después de guardar/actualizar
  }

  goToProfile() {
    // Implementar lógica para navegar a la página de perfil si es necesario
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}
