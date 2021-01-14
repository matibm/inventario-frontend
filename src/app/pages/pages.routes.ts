import { AppComponent } from './../app.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProductosComponent } from './productos/productos.component';
import { ResumenComponent } from './resumen/resumen.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CierreCajaComponent } from './cierre-caja/cierre-caja.component';
import { FacturaComponent } from './factura/factura.component';
  import { LoginComponent } from './login/login.component';
 import { LoginGuard } from '../guard/login.guard';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router'; 
 

const pagesRoutes: Routes = [
    
   
  {
    path: 'login', component: LoginComponent
  },

  {     
    path: '', component: PagesComponent,
    
    canActivate: [LoginGuard],
    children: [
      { path: 'facturas', component: FacturaComponent },
      { path: 'caja', component: CierreCajaComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'resumen', component: ResumenComponent },
    
      { path: 'productos', component: ProductosComponent },
      { path: 'proveedores', component: ProveedoresComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: '', component: AppComponent },
      { path: '**', component: AppComponent }
    
    ]
  }
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);