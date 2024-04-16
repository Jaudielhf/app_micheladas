import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosPage } from './productos.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosPage
  },
  
  {
    path: 'menuAdmin',
    loadChildren: () => import('../menu-admin/menu-admin.module').then(m => m.MenuAdminPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('../addproducto/addproducto.module').then(m => m.AddproductoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosPageRoutingModule {}
