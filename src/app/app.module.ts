import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [ImagenPipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
