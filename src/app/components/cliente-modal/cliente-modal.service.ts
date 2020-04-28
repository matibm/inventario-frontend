import { ProductoService } from './../../services/producto.service';
import { ImprimirFacturaService } from 'src/app/components/imprimir-factura/imprimir-factura.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteModalService {
  oculto = 'oculto'
  cliente = {
    ci:'',
    ruc:'',
    nombre:''
  }
  factura
  imprimir = false;
  constructor(
    

  ) { }

  ocultarModal(){
    this.oculto = 'oculto'
  }

  guardar(){  
    
    console.log(this.cliente)
    if (this.cliente.ci || this.cliente.ruc || this.cliente.nombre) {
      this.imprimir = true;  
    }
    this.ocultarModal();
    
    // this._productosService.oculto = 'oculto';
    // this._imprimiFacturaService.mostrarFactura(this.cliente, this.factura)


  }

}
