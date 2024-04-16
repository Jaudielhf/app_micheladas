import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  ip!: string;
  constructor(public http:HttpClient, private router:Router){
    this.ip='192.168.1.76';
    
  }
  ngOnInit() {
  }

goToProfile(){

}
goToAbout(){
  this.router.navigateByUrl('/menu-admin');
}
Logout(){
  this.router.navigateByUrl('/login');
}
}
