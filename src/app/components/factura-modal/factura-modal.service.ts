import { ClienteService } from './../../services/cliente.service';
import { FacturaService } from './../../services/factura.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaModalService {
  oculto: string = 'oculto';
  monto
  factura = null
  fecha
  debiendo
  cliente = null;
  productos = null;
  constructor(
    public _facturaService: FacturaService,
    private _clienteService: ClienteService
  ) { }

  ocultarModal(){
    this.factura = null;
      this.oculto = 'oculto';
      this.cliente = null;
      this.debiendo = null; 
  }

  eliminarFactura(factura){
    console.log(this.factura);
    
    this._facturaService.eliminarFactura(this.factura).subscribe()
    // this.ocultarModal()
  }

  mostrarModal(factura){
    
    console.log(factura);
    if (factura.cliente) {
      this._clienteService.getCliente(factura.cliente).subscribe(cliente =>{
        this.cliente = cliente;
        this.debiendo = factura.debiendo;
      })
      
    }

    this.fecha = factura.fecha
    this.factura = factura;
    this.productos = factura.productos
    this.monto = factura.monto
    this.oculto = '';
    // setTimeout(() => {
    //   window.print()  
    // }, 500);
    


  }

}
