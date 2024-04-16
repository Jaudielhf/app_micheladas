import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.page.html',
  styleUrls: ['./dashboard-usuario.page.scss'],
})
export class DashboardUsuarioPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
 
  goToAbout(){
    console.log("Welcome");
  }
  Logout(){
    this.router.navigateByUrl('/login');
  }
}
