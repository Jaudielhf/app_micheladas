import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAdminPage } from './menu-admin.page';

const routes: Routes = [
  {
    path: '',
    component: MenuAdminPage
  },
  {
    path: 'productos',
    loadChildren: () => import('../productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'menuAdmin',
    loadChildren: () => import('../menu-admin/menu-admin.module').then(m => m.MenuAdminPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('../addproducto/addproducto.module').then(m => m.AddproductoPageModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('../ventas/ventas.module').then(m => m.VentasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAdminPageRoutingModule {}
