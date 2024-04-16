import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  ip!: string;
  productos: any = [];
  carrito: any = []; // Nuevo: arreglo para almacenar los productos en el carrito

  constructor(private router: Router, private http: HttpClient) {
    this.ip = "192.168.1.95";
  }

  ngOnInit() {
    this.listaproductos();
    
  }
  ionViewWillEnter() {
    // Vaciar el carrito al entrar en la página del menú
    this.carrito = [];
  }

  listaproductos() {
  console.log("Productos antes de cargar:", this.productos);
  this.http.get("http://" + this.ip + "/servicios/listaarticulos.php").subscribe(
    (res) => {
      console.log(res);
      this.productos = res;
    },
    (error) => {
      console.log(error);
    }
  );
}

  // Función para agregar un producto al carrito
  agregarAlCarrito(producto: any) {
    console.log("Producto a agregar al carrito:", producto);
  
    // Verificar si 'producto' está definido
    if (producto) {
      this.carrito.push(producto);
      console.log("Producto agregado al carrito:", producto);
      console.log("Contenido del carrito actualizado:", this.carrito);
    } else {
      console.log("No se puede agregar el producto al carrito porque no está definido.");
    }
  }
  
  

 // Función para abrir la página del carrito
abrirCarrito() {
  // Aquí se construye la URL con el parámetro 'carrito' que contiene el arreglo JSON de 'carrito'
  const navigationExtras: NavigationExtras = {
    queryParams: {
      carrito: JSON.stringify(this.carrito) // Convertir el arreglo 'carrito' a JSON y pasarlo como parámetro
    }
  };
  // Navegar a la página del carrito con los datos del carrito como parámetro
  this.router.navigate(['/carrito'], navigationExtras);
}


  goToAbout() {
    // Función para navegar a la página "Acerca de"
  }

  Logout() {
    this.router.navigateByUrl('/login');
  }
}
