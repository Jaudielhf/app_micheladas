import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentasPage } from './ventas.page';

const routes: Routes = [
  {
    path: '',
    component: VentasPage
  }
  ,{
    path: 'productos',
    loadChildren: () => import('../productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('../addproducto/addproducto.module').then(m => m.AddproductoPageModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('../ventas/ventas.module').then(m => m.VentasPageModule)
  },
  {
    path: 'menuAdmin',
    loadChildren: () => import('../menu-admin/menu-admin.module').then(m => m.MenuAdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasPageRoutingModule {}
