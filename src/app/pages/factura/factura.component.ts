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
  facturas = new Array
  desde
  items
  total
  cantidad
  factura
  egresos
  hoy: Date
  diaDesde: number
  mesDesde
  yearDesde
  semanaDesde: Date
  diaHasta
  mesHasta
  yearHasta
  dateDesde: Date
  dateHasta: Date = new Date();
  totalF = 0;
  totalBrutoF = 0;
  cantidadF = 0;

  constructor(
    private _facturaService: FacturaService,
    public _facturaModalService: FacturaModalService,
    public _egresosService: EgresoService
  ) { }

  ngOnInit() {
    this.setFechas()
    this.cargarFacturas(this.dateDesde.valueOf(), this.dateHasta.valueOf())
    this.cargarEgresos()
  }

  setFechas() {
    this.dateDesde = new Date()
    this.hoy = new Date()
    // this.diaDesde = this.hoy
    console.log(this.dateDesde);
    
    this.semanaDesde = new Date(this.dateDesde.setFullYear(this.dateDesde.getFullYear(), this.dateDesde.getMonth(), this.dateDesde.getDate().valueOf() - 7))
    this.dateDesde = this.semanaDesde
    console.log(this.semanaDesde);
    
    this.dateDesde.setHours(0, 0, 0);
    this.dateHasta.setHours(23, 59, 0);
    console.log(this.dateHasta);

    this.diaDesde = this.dateDesde.getDate();
    this.mesDesde = this.dateDesde.getUTCMonth() + 1;
    this.yearDesde = this.dateDesde.getFullYear();

    this.diaHasta = this.hoy.getDate();
    this.mesHasta = this.hoy.getMonth() + 1;
    this.yearHasta = this.hoy.getFullYear();
  }



  cargarFacturas(desde, hasta) {
    //  this.cargando = true;
    this._facturaService.getFacturas(this.desde).subscribe((resp: any) => {

      // this.facturas = resp.facturas.reverse()
      this.facturas = new Array()
      console.log(resp.facturas);
      for (let i = 0; i < resp.facturas.reverse().length; i++) {
        const factura = resp.facturas.reverse()[i];
        if (factura.fecha >= desde && factura.fecha <= hasta) {
          this.facturas.push(factura)
        }
        this.facturas = this.facturas.reverse()
      }
      //  this.cargando = false;
      this.cargarMontos()

    })
  }



  filtrar() {
    let date = new Date();
    let desde = new Date(date.setUTCFullYear(this.yearDesde, this.mesDesde - 1, this.diaDesde));
    desde.setHours(0, 0, 0)

    date = new Date();
    let hasta = new Date(date.setUTCFullYear(this.yearHasta, this.mesHasta - 1, this.diaHasta));
    hasta.setHours(23, 59, 0)
    console.log(desde);
    console.log(hasta);
    this.cargarFacturas(desde, hasta);

  }


  cargarMontos() {
    let total = 0;
    let totalBruto = 0;
    let cantidad = 0;
    for (let i = 0; i < this.facturas.length; i++) {
      const factura = this.facturas[i];
      for (let j = 0; j < factura.productos.length; j++) {
        const producto = factura.productos[j];
        if (!producto.desc) {
          total += producto.precio * producto.cantidad;
        } else {
          total += producto.descuento * producto.cantidad;
        }
        totalBruto += producto.precioBruto * producto.cantidad;
        cantidad += producto.cantidad;
      }

    }
    this.totalF = total;
    this.totalBrutoF = totalBruto;
    this.cantidadF = cantidad;
  }

  cargarEgresos() {
    this._egresosService.getEgresos().subscribe((resp: any) => {
      this.egresos = resp.egresos.reverse();
      console.log(this.egresos);

    })
  }

  verFacturaModal(factura) {
    localStorage.setItem('factura', factura)
    this._facturaModalService.mostrarModal(factura)
  }

  buscarProducto(termino: string) {
    if (termino.length <= 0) {
      this.cargarFacturas(this.dateDesde.valueOf(), this.dateHasta.valueOf());
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
