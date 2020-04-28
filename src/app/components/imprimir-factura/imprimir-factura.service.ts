import { ProductoService } from './../../services/producto.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImprimirFacturaService {
  oculto: string = 'oculto';
  cliente = {
    ci: '',
    ruc: '', 
    nombre: ''
  }
  constructor(
  ) { 
    
  }

  mostrarFactura(cliente, factura){
    this.cliente = cliente; 
    this.oculto = ''
  }

}
