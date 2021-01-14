import { PAGES_ROUTES } from './pages.routes';
import { AppRoutingModule } from './../app-routing.module';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EditClientComponent } from './../components/edit-client/edit-client.component';
import { PrecioPipe } from './../pipes/precio.pipe';
import { ReabastecerComponent } from './../components/reabastecer/reabastecer.component';
import { CrearIngresoModalComponent } from './../components/crear-ingreso-modal/crear-ingreso-modal.component';
import { EditarServicioModalComponent } from './../components/editar-servicio-modal/editar-servicio-modal.component';
import { CrearServicioModalComponent } from './../components/crear-servicio-modal/crear-servicio-modal.component';
import { EditarProveedorModalComponent } from './../components/editar-proveedor-modal/editar-proveedor-modal.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { RecargaModalComponent } from './../components/recarga-modal/recarga-modal.component';
import { LoginComponent } from './../components/login/login.component';
import { ResumenComponent } from './resumen/resumen.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteModalComponent } from './../components/cliente-modal/cliente-modal.component';
import { ImprimirFacturaComponent } from './../components/imprimir-factura/imprimir-factura.component';
import { SessionModalComponent } from './../components/session-modal/session-modal.component';
import { EditarProductoModalComponent } from './../components/editar-producto-modal/editar-producto-modal.component';
import { CrearProductoModalComponent } from './../components/crear-producto-modal/crear-producto-modal.component';
import { CierreCajaComponent } from './cierre-caja/cierre-caja.component';
import { CajaModalComponent } from './../components/caja-modal/caja-modal.component';
import { CrearEgresoComponent } from './../components/crear-egreso/crear-egreso.component';
import { FacturaModalComponent } from './../components/factura-modal/factura-modal.component';
import { FechaPipe } from './../pipes/fecha.pipe';
import { FacturaComponent } from './factura/factura.component';
import { HeaderComponent } from './../shared/header/header.component';
import { SidebarComponent } from './../shared/sidebar/sidebar.component';
import { ImagenPipe } from './../pipes/imagen.pipe';
import { ProductosComponent } from './productos/productos.component';
import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent
    // AppComponent,
    // ProductosComponent,
    // ImagenPipe,
    // SidebarComponent,
    // HeaderComponent,
    // FacturaComponent,
    // FechaPipe,
    // FacturaModalComponent,
    // CrearEgresoComponent,
    // CajaModalComponent,
    // CierreCajaComponent,
    // CrearProductoModalComponent,
    // EditarProductoModalComponent,
    // SessionModalComponent,
    // ImprimirFacturaComponent,
    // ClienteModalComponent,
    // ClientesComponent,
    // ResumenComponent,
    // // LoginComponent,
    // LoginComponent,
    // RecargaModalComponent,
    // ProveedoresComponent,
    // EditarProveedorModalComponent,
    // CrearServicioModalComponent,
    // EditarServicioModalComponent,
    // CrearIngresoModalComponent,
    // ReabastecerComponent,
    // PrecioPipe,
    // EditClientComponent,
    // UsuariosComponent,
    // PagesComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

     FormsModule,
    NgxPrintModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PAGES_ROUTES
    
  ],
})
export class PagesModule { }
