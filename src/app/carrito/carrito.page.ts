import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: any = [];
  ip: string='';
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
  ) {
    this.ip='barsinson.site'
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['carrito']) {
        this.carrito = JSON.parse(params['carrito']);
      }
    });
  }
  goToMenu(){
    this.router.navigateByUrl('/menu');
  }
  
  calcularPrecioTotal(): number {
    return this.carrito.reduce((total: number, producto: any) => total + parseFloat(producto.precio), 0);
  }

  async vaciarCarrito() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas vaciar el carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Vaciar',
          handler: () => {
            this.carrito = [];
          }
        }
      ]
    });
    await alert.present();
  }
  
  eliminarDelCarrito(producto: any) {
    this.carrito = this.carrito.filter((item: any) => item !== producto);
  }

  procederAlPago() {
    const productosVenta = this.carrito.map((producto: any) => {
      return {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: parseFloat(producto.precio),
        cantidad: 1 
      };
    });
  
    const totalVenta = this.calcularPrecioTotal();

    const datosVenta = {
      productos: productosVenta,
      total: totalVenta
    };
    const urlServicio = 'https://'+this.ip+'/Servicios/usuarios/venta_carrito.php';
    this.http.post(urlServicio, datosVenta).subscribe(
      respuesta => {
        console.log('Respuesta del servidor:', respuesta);
        console.log('Respuesta del servidor (texto):', respuesta);
        this.router.navigateByUrl('/menu');
      },
      error => {
        console.error('Error en la solicitud:', error);
      
        this.router.navigateByUrl('/menu');
      }
    );
    console.log(datosVenta);
  }
  
}
