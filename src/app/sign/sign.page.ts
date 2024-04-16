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
  ip: string = "192.168.74.40";
  constructor(private http: HttpClient, private router: Router) { }
  login(){
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
  }
  AgregarUsuario(){
    let user = new Usuario(this.nombre, this.apellido, this.email, this.password);
    this.http.post("http://"+this.ip+"/servicios/usuarios/adduser.php", user).subscribe(

    (res) => {
      console.log(res);
      if (res.hasOwnProperty('success') === true) {
        this.router.navigateByUrl('/login');
      } else {
        // Manejar el caso en el que la inserción no fue exitosa
        console.error('La inserción no fue exitosa');
      }
    
  },
    (error)=>{
      console.log(error);
    }
    );
  }

}
