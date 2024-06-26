import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage{
  ip: string;
  productos: any;
  carrito: any = [];

  constructor(private router: Router, private http: HttpClient) {
    this.ip='barsinson.site';
    this.listaproductos();
  }
  home(){
      this.router.navigateByUrl('/dashboard-usuario');
  }

  listaproductos() {
    this.http.get('https://'+this.ip+'/servicios/listaarticulos.php').subscribe(
      (res) => {
        console.log(res);
        this.productos = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  agregarAlCarrito(producto: any) {
    console.log("Producto a agregar al carrito:", producto);
  
    if (producto) {
      this.carrito.push(producto);
      console.log("Producto agregado al carrito:", producto);
      console.log("Contenido del carrito actualizado:", this.carrito);
    } else {
      console.log("No se puede agregar el producto al carrito porque no está definido.");
    }
  }
  
abrirCarrito() {
  const navigationExtras: NavigationExtras = {
    queryParams: {
      carrito: JSON.stringify(this.carrito)
    }
  };
  this.router.navigate(['/carrito'], navigationExtras);
}


  goToAbout() {
  }

  Logout() {
    this.router.navigateByUrl('/login');
  }
}
