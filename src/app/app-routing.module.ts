import { CierreCajaComponent } from './pages/cierre-caja/cierre-caja.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './pages/factura/factura.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [
  {path: 'facturas', component: FacturaComponent},
  {path: 'caja', component: CierreCajaComponent},
  
  {path: '', component: ProductosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
