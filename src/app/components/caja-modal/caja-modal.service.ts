import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CajaModalService {

  constructor() { }

  oculto: string = 'oculto';
  monto
  motivo
  factura = null
  fecha
  productos = null;
  

  ocultarModal(){
    this.factura = null;
      this.oculto = 'oculto';
  }

  mostrarModal(){
    
    this.oculto = '';
  }

  

}
