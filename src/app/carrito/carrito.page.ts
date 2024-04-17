import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: any = [];
  ip = "192.168.1.192";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['carrito']) {
        this.carrito = JSON.parse(params['carrito']);
      }
    });
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
  

  async procederAlPago() {
    const venta = {
      cantidadTotal: this.calcularCantidadTotal(),
      precioTotal: this.calcularPrecioTotal(),
      detallesVenta: this.carrito.map((producto: any) => {
        return {
          producto: producto.nombre, // Ajusta esto según cómo almacenes el nombre del producto
          precio_unitario: producto.precio, // Precio unitario del producto
          cantidad: producto.cantidad // Cantidad de productos
        };
      })
    };
  
    try {
      const urlServicio = `http://${this.ip}/servicios/usuarios/venta_carrito.php`;
      const respuesta = await this.http.post(urlServicio, venta).toPromise();
      console.log('Respuesta del servidor:', respuesta);
      // Aquí podrías manejar la respuesta del servidor según lo que necesites
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Aquí podrías manejar los errores de la solicitud HTTP
    }
  }
  
  
  calcularCantidadTotal(): number {
    return this.carrito.reduce((total: number, producto: any) => total + producto.cantidad, 0);
  }
  
}
