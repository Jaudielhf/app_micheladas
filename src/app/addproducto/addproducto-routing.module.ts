import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddproductoPage } from './addproducto.page';

const routes: Routes = [
  {
    path: '',
    component: AddproductoPage
  },
  {
    path: 'menuAdmin',
    loadChildren: () => import('../menu-admin/menu-admin.module').then(m => m.MenuAdminPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('../productos/productos.module').then( m => m.ProductosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddproductoPageRoutingModule {}
