import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrearEgresoService {

  oculto: string = 'oculto';
  monto
  motivo
  factura = null
  fecha
  productos = null;
  constructor() { }

  ocultarModal(){
    this.factura = null;
      this.oculto = 'oculto';
  }

  mostrarModal(){
    
    this.oculto = '';
  }

  

}
