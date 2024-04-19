import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email : string ='';
  password : string='';
  ip: string = ' ';
  constructor(private http: HttpClient, private router: Router) {
    this.ip='201.116.64.233'
  }
  ValidarDato() {
    const url = 'http://'+this.ip+'/Servicios/usuarios/validar_datos.php';
    const data = {
      email: this.email,
      password: this.password
    };
    
    this.http.post<any>(url, data).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error desconocido';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Código de error ${error.status}, cuerpo del error: ${error.error}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    ).subscribe(
      (res) => {
        console.log(res);
        const rol = res.rol;
        if (rol === 'administrador') {
          console.log('El usuario es un administrador.');
          this.router.navigateByUrl('/productos');
        } else if (rol === 'usuario') {
          console.log('El usuario no es un administrador.');
          this.router.navigateByUrl('/dashboard-usuario');
        }
      }
    );
  }
  
  sign() {
    this.router.navigateByUrl('/sign');
  }
  home(){
    this.router.navigateByUrl('/home');
  }
}
