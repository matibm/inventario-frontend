import { PagesModule } from './pages/pages.module';
import { PAGES_ROUTES } from './pages/pages.routes';
import { LoginComponent } from './pages/login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { FacturaModalComponent } from './components/factura-modal/factura-modal.component';
import { CrearEgresoComponent } from './components/crear-egreso/crear-egreso.component';
import { CajaModalComponent } from './components/caja-modal/caja-modal.component';
import { CierreCajaComponent } from './pages/cierre-caja/cierre-caja.component';
import { CrearProductoModalComponent } from './components/crear-producto-modal/crear-producto-modal.component';
import { EditarProductoModalComponent } from './components/editar-producto-modal/editar-producto-modal.component';
import { SessionModalComponent } from './components/session-modal/session-modal.component';
import { ImprimirFacturaComponent } from './components/imprimir-factura/imprimir-factura.component';
import { ClienteModalComponent } from './components/cliente-modal/cliente-modal.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ResumenComponent } from './pages/resumen/resumen.component';
// import { LoginComponent } from './components/login/login.component';
import { RecargaModalComponent } from './components/recarga-modal/recarga-modal.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { NgxPrintModule } from 'ngx-print';
import { EditarProveedorModalComponent } from './components/editar-proveedor-modal/editar-proveedor-modal.component';
import { CrearServicioModalComponent } from './components/crear-servicio-modal/crear-servicio-modal.component';
import { EditarServicioModalComponent } from './components/editar-servicio-modal/editar-servicio-modal.component';
import { CrearIngresoModalComponent } from './components/crear-ingreso-modal/crear-ingreso-modal.component';
import { ReabastecerComponent } from './components/reabastecer/reabastecer.component';
import { PrecioPipe } from './pipes/precio.pipe';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PagesComponent } from './pages/pages.component';
import localePy from '@angular/common/locales/es-PY';
import { registerLocaleData } from '@angular/common';
import { SelectUserComponent } from './components/select-user/select-user.component';

import {NgxPaginationModule} from 'ngx-pagination';
registerLocaleData(localePy, 'es-PY');


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ImagenPipe,
    SidebarComponent,
    HeaderComponent,
    FacturaComponent,
    FechaPipe,
    FacturaModalComponent,
    CrearEgresoComponent,
    CajaModalComponent,
    CierreCajaComponent,
    CrearProductoModalComponent,
    EditarProductoModalComponent,
    SessionModalComponent,
    ImprimirFacturaComponent,
    ClienteModalComponent,
    ClientesComponent,
    ResumenComponent,
    // LoginComponent,
    LoginComponent,
    RecargaModalComponent,
    ProveedoresComponent,
    EditarProveedorModalComponent,
    CrearServicioModalComponent,
    EditarServicioModalComponent,
    CrearIngresoModalComponent,
    ReabastecerComponent,
    PrecioPipe,
    EditClientComponent,
    UsuariosComponent,
    PagesComponent,
    SelectUserComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PagesModule,
     FormsModule,
    NgxPrintModule,
    AppRoutingModule,
    NgxPaginationModule,
    PAGES_ROUTES
    
  ],
  exports: [ImagenPipe ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-PY' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
