import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardUsuarioPage } from './dashboard-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardUsuarioPage
  },
  {
    path: 'menu',
    loadChildren: () => import('../menu/menu.module').then(m => m.MenuPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class DashboardUsuarioPageRoutingModule {}
