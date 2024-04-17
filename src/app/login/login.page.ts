import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  ip: string = "192.168.1.172";
  
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {}

  ValidarDato() {
    const url = `http://${this.ip}/servicios/usuarios/validar_datos.php`;
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
  
  sign(){
    this.router.navigateByUrl('/sign');
  }
}
