import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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
  ip: string = '192.168.1.76';

  constructor(private router: Router, private http: HttpClient) {}

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

  EliminarProducto(mat: string) {
    this.http.get('http://' + this.ip + '/servicios/delarticulo.php?id_producto=' + mat).subscribe(
      (res) => {
        console.log(res);
        this.listaproductos();
        alert('Producto eliminado correctamente');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  EditarProducto(mat: string) {
    this.http.get('http://' + this.ip + '/servicios/busarticulo.php?id_producto=' + mat).subscribe(
      (res: any) => {
        console.log(res);
        this.txtma = res[0].matricula;
        this.txtnm = res[0].nombre;
        this.txtca = res[0].carrera;
        this.txtgr = res[0].grupo;
        this.nuevo = false;
      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigateByUrl('/login');
  }
  goToProfile() {

  }

  goToAbout(){
    
  }

  Logout() {
    this.router.navigateByUrl('/login');
  }
}
