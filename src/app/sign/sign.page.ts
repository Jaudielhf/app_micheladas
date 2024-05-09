import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './model/Usuario';



@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {
  nombre !:string;
  apellido !:string;
  email !:string;
  password! :string;
  ip!:string;
  constructor(private http: HttpClient, private router: Router) {
    this.ip='barsinson.site';
   }
   
  login(){
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
  }
  AgregarUsuario(){
    let user = new Usuario(this.nombre, this.apellido, this.email, this.password);
    this.http.post('https://'+this.ip+'/Servicios/usuarios/adduser.php', user).subscribe(

    (res) => {
      console.log(res);
      if (res.hasOwnProperty('success') === true) {
        this.router.navigateByUrl('/login');
      } else {
        console.error('La inserción no fue exitosa');
      }
    
  },
    (error)=>{
      console.log(error);

    }
    );
  }
  

}
