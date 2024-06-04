import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './model/Usuario';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController) {}
   
  login() {
    this.navCtrl.navigateForward('/login'); // Asegúrate de tener configurada la ruta a la página de login
  }
  ngOnInit() {
  }
  async AgregarUsuario() {
    try {
      await this.authService.signup(this.email, this.password, this.nombre, this.apellido);
      // Navegar a la página principal
      this.navCtrl.navigateForward('/home'); // Asegúrate de tener configurada la ruta a la página principal
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error signing up:', error);
        // Mostrar un mensaje de error
        alert('Error al registrarse: ' + error.message);
      } else {
        console.error('Unexpected error', error);
      }
    }
  }
  

}
