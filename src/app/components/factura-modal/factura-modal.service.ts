import { ClienteService } from './../../services/cliente.service';
import { FacturaService } from './../../services/factura.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaModalService {
  oculto: string = 'oculto';
  monto
  factura = null
  fecha
  debiendo
  public notificacion = new EventEmitter<any>();
  public guardado = new EventEmitter();
  cliente = null;
  productos = null;
  mostrarcomision = false;
  prohibirEliminar = false
  constructor(
    public _facturaService: FacturaService,
    private _clienteService: ClienteService
  ) { }

  ocultarModal() {
    this.factura = null;
    this.oculto = 'oculto';
    this.cliente = null;
    this.debiendo = null;
  }

  eliminarFactura(factura) { 
    this._facturaService.eliminarFactura(this.factura).subscribe(
      resp => {
        this.ocultarModal()
        this.notificacion.emit();
      }
    )
    // this.ocultarModal()
  }

  guardarFactura(factura){
    this._facturaService.putFactura(factura).subscribe(()=>{
      this.guardado.emit()
      this.ocultarModal()
    })
  }

  mostrarModal(factura, habilitarEliminar?, comsion? ) { 
    this.prohibirEliminar = habilitarEliminar || false;
    this.mostrarcomision = comsion || false;
    console.log(this.prohibirEliminar);

    if (factura.cliente) {
      this._clienteService.getCliente(factura.cliente).subscribe(cliente => {
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
