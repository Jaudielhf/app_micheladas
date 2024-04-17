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
  ip = "192.168.1.192";

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
  ) {}

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
    // Construir la lista de productos con la estructura correcta
    const productosVenta = this.carrito.map((producto: any) => {
      return {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: parseFloat(producto.precio),
        cantidad: 1 // Esto puede ajustarse según cómo manejes la cantidad en tu carrito
      };
    });
  
    // Calcular el total de la venta
    const totalVenta = this.calcularPrecioTotal();
  
    // Construir el objeto datosVenta con los productos y el total
    const datosVenta = {
      productos: productosVenta,
      total: totalVenta
    };
  
    // Enviar los datos al servidor
    const urlServicio = 'http://' + this.ip + '/servicios/usuarios/venta_carrito.php';
    this.http.post(urlServicio, datosVenta).subscribe(
      respuesta => {
        console.log('Respuesta del servidor:', respuesta);
        // Imprimir la respuesta del servidor como texto
        console.log('Respuesta del servidor (texto):', respuesta);
        // Manejar la respuesta del servidor según lo que necesites
        this.router.navigateByUrl('/menu');
      },
      error => {
        console.error('Error en la solicitud:', error);
        // Manejar los errores de la solicitud HTTP
        
        this.router.navigateByUrl('/menu');
      }
    );
    console.log(datosVenta);
  }
  
}
