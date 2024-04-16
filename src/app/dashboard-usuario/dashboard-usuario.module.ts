import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardUsuarioPageRoutingModule } from './dashboard-usuario-routing.module';

import { DashboardUsuarioPage } from './dashboard-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardUsuarioPageRoutingModule
  ],
  declarations: [DashboardUsuarioPage]
})
export class DashboardUsuarioPageModule {}
