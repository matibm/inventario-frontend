import { EgresoService } from './../../services/egreso.service';
import { FacturaModalService } from './../../components/factura-modal/factura-modal.service';
import { FacturaService } from './../../services/factura.service';
import { ProductoService } from './../../services/producto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {
  facturas
  desde
  items
  total
  cantidad
  factura
  egresos
  constructor(
    private _facturaService: FacturaService,
    public _facturaModalService: FacturaModalService,
    public _egresosService: EgresoService
  ) { }

  ngOnInit() {
    this.cargarFacturas()
    this.cargarEgresos()
  }

  cargarFacturas() {
    //  this.cargando = true;
    this._facturaService.getFacturas(this.desde).subscribe((resp: any) => {

      this.facturas = resp.facturas
      //  this.cargando = false;
    })
  }

  cargarEgresos() {
    this._egresosService.getEgresos().subscribe((resp: any) => {
      this.egresos = resp.egresos;
      console.log(this.egresos);
      
    })
  }

  verFacturaModal(factura) {
    localStorage.setItem('factura', factura)
    this._facturaModalService.mostrarModal(factura)
  }

  buscarProducto(termino: string) {
    if (termino.length <= 0) {
      this.cargarFacturas();
      return;
    }
    this._facturaService.buscarFacturas(termino).subscribe((facturas) => {
      this.facturas = facturas
    })
  }
  seleccionarCantidad(cantidad) {
    
    this.cantidad = cantidad
  }

  vender() {
    let date = new Date()
    this.factura = {
      productos: this.items,
      fecha: date.getTime(),
      monto: this.total
    }
    this._facturaService.setFactura(this.factura).subscribe()

  }


}
