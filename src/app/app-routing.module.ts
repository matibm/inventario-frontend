import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './guard/login.guard';
 import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ResumenComponent } from './pages/resumen/resumen.component';
import { AppComponent } from './app.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CierreCajaComponent } from './pages/cierre-caja/cierre-caja.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './pages/factura/factura.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [

  {
    path: 'login', component: LoginComponent
  },

  // {
        
  //   path: '', component: PagesComponent,
    
  //   canActivate: [LoginGuard],
  //   children: [
  //     { path: 'facturas', component: FacturaComponent },
  //     { path: 'caja', component: CierreCajaComponent },
  //     { path: 'clientes', component: ClientesComponent },
  //     { path: 'resumen', component: ResumenComponent },
    
  //     { path: 'productos', component: ProductosComponent },
  //     { path: 'proveedores', component: ProveedoresComponent },
  //     { path: 'usuarios', component: UsuariosComponent },
  //     { path: '', component: AppComponent },
  //     { path: '**', component: AppComponent }
    
  //   ]
  // }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
