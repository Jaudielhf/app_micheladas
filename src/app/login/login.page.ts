
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ValidarDato() {
    const url = 'https://barsinson-site.preview-domain.com/Servicios/usuarios/validar_datos.php';
    const data = {
      email: this.email,
      password: this.password
    };
    
    this.http.post<any>(url, data).subscribe(
      (res) => {
        console.log(res);
        console.log(data.email);
        const rol = res.rol;
        if (rol === 'administrador') {
            
            console.log('El usuario es un administrador.');
           
            this.router.navigateByUrl('/productos');
        } else if( rol === 'usuario') {
            console.log('El usuario no es un administrador.');
            this.router.navigateByUrl('/dashboard-usuario');
        }
      },
      (error) => {
        console.log(error);
      }
    );
   }
    
  sign() {
    this.router.navigateByUrl('/sign');
  }
}
