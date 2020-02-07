import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaModalService {
  oculto: string = 'oculto';
  monto
  factura = null
  fecha
  productos = null;
  constructor() { }

  ocultarModal(){
    this.factura = null;
      this.oculto = 'oculto';
  }

  mostrarModal(factura){
    console.log(factura);
    this.fecha = factura.fecha
    this.factura = factura;
    this.productos = factura.productos
    this.monto = factura.monto
    this.oculto = '';
  }

}
