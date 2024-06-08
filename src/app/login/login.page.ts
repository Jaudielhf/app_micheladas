import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth
import { AlertController } from '@ionic/angular';
import { FacebookAuthProvider } from 'firebase/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
   
    
  ) {}

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Usuario o contraseña incorrectos',
      buttons: ['OK']

    });
  }

  async ValidarDato() {
    try {
      await this.authService.login(this.email, this.password);
      
      // Suscribirse a cambios en la autenticación del usuario
      this.afAuth.authState.subscribe(user => { // Utiliza authState en lugar de authStateChanges
        if (user) {
          const uid = user.uid;
          
          // Obtener los datos del usuario utilizando el uid
          this.authService.getUserData(uid).then(userData => {
            if (userData) {
              const rol = userData['Rol'];
              // Redireccionar según el rol del usuario
              if (rol === 'usuario') {
                this.navCtrl.navigateForward('/dashboard-usuario');
              } else if (rol === 'administrador') {
                this.navCtrl.navigateForward('/productos');
              } else {
                // Redireccionar a una página por defecto si el rol no está definido
                this.navCtrl.navigateForward('/dashboard');
              }
            }
          });
        }
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.presentAlert();
      
    }
  }
  
  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      
      // Redireccionar a la página adecuada después de iniciar sesión con Google
      const user = await this.afAuth.currentUser; // Espera a que la promesa se resuelva
      if (user) {
        const userData = await this.authService.getUserData(user.uid);
        if (userData) {
          const rol = userData['Rol'];
          if (rol === 'usuario') {
            this.navCtrl.navigateForward('/dashboard-usuario');
          } else if (rol === 'administrador') {
            this.navCtrl.navigateForward('/productos');
          } else {
            this.navCtrl.navigateForward('/dashboard');
          }
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  }
  async loginWithFacebook() {
    try {
      await this.authService.loginWithFacebook();
      const user = await this.afAuth.currentUser;
      if (user) {
        const userData = await this.authService.getUserData(user.uid);
        if (userData) {
          const rol = userData.Rol;
          if (rol === 'usuario') {
            this.navCtrl.navigateForward('/dashboard-usuario');
          } else if (rol === 'administrador') {
            this.navCtrl.navigateForward('/productos');
          } else {
            this.navCtrl.navigateForward('/dashboard');
          }
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Facebook:', error);
    }
  }

  sign() {
    this.navCtrl.navigateForward('/sign');
  }

  home() {
    this.navCtrl.navigateBack('/home');
  }
}
