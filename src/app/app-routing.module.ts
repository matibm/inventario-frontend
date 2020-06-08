import { ResumenComponent } from './pages/resumen/resumen.component';
import { AppComponent } from './app.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CierreCajaComponent } from './pages/cierre-caja/cierre-caja.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './pages/factura/factura.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [
  {path: 'facturas', component: FacturaComponent},
  {path: 'caja', component: CierreCajaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'resumen', component: ResumenComponent},
  
  {path: 'productos', component: ProductosComponent},
  {path: '', component: AppComponent},
  {path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
