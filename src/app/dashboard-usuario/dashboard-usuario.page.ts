import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.page.html',
  styleUrls: ['./dashboard-usuario.page.scss'],
})
export class DashboardUsuarioPage implements OnInit {

  constructor(private router:Router,
    private authService: AuthService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
 
  goToAbout(){
    console.log("Welcome");
  }
  async Logout() {
    try {
      await this.authService.logout();
      this.navCtrl.navigateBack('/home');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
