import { IngresoService } from './../../services/ingreso.service';
import { EgresoService } from './../../services/egreso.service';
import { FacturaService } from './../../services/factura.service';
import { CierreCajaService } from './../../services/cierre-caja.service';
import { CajaModalService } from './caja-modal.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-caja-modal',
  templateUrl: './caja-modal.component.html',
  styleUrls: ['./caja-modal.component.scss']
})
export class CajaModalComponent implements OnInit {
  montoT
  montoFijo
  caja

  cajaCerrada = true;
  constructor(
    public _cajaModalService: CajaModalService,
    public _cajaService: CierreCajaService,
    private _facturaService: FacturaService,
    private _egresoService: EgresoService,
    private _ingresoService: IngresoService

  ) { }

  ngOnInit() {

  }

  async crearCaja() {

    this._cajaModalService.montoFijo = this.montoT
    localStorage.setItem('montofijo', this.montoT);
    localStorage.setItem('montofijocerrado', '1');
    this._cajaModalService.montoFijoCerrado = '1'
    this._cajaModalService.ocultarModal()

    // let date = new Date()
    let date = new Date();
    let desde = new Date(date.setUTCFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    // let date = new Date(new Date().setUTCDate(new Date().valueOf()))
    console.log(desde);


    let caja = {
      facturas: [],
      egresos: [],
      montoFijo: this.montoFijo,
      montoVentas: 0,
      montoEgresos: 0,
      montoCobros: 0,
      costoVentas: 0,
      montoIngresos: 0,
      fechaInicio: desde.valueOf(),
      fechaCierre: 0,
      cerrado: false
    }


    this._cajaService.cajaActual = await this._cajaService.setCierreCaja(caja)

  }


  async cerrarCaja() {
    let dateDesde = this._cajaService.cajaActual.fechaInicio;
    this._cajaModalService.ocultarModal()
    let dateActual = new Date().valueOf()
    let facturas = await this._facturaService.getFacturas(dateDesde, dateActual);
    let egresos = await this._egresoService.getEgresos(dateDesde, dateActual);
    let ingresos = await this._ingresoService.getIngresos(dateDesde, dateActual)
    let cobros: any = await this._facturaService.getCobros({ desde: dateDesde, hasta: dateActual })
    console.log(cobros);
    this.caja = this._cajaService.cajaActual
    for (let i = 0; i < cobros.cuotas.length; i++) {
      const cobro = cobros.cuotas[i];
      console.log(cobro);
      
      this.caja.costoVentas += cobro.factura.costo
      this.caja.montoCobros += cobro.monto_cuota
    }
    console.log(ingresos);

    
    // this.caja.facturas = facturas
    let facturaFiltrada = []
    if (facturas.length) {
      for (let i = 0; i < facturas.length; i++) {
        const element = facturas[i];
        if (element.debiendo == false && element.es_cuota != true) {
          facturaFiltrada.push(element)
        }
      }
    }
    this.caja.facturas = facturaFiltrada;
    this.caja.cobros = cobros.cuotas;

    this.caja.montoVentas = this.getMontoPorArreglo(facturaFiltrada);
    this.caja.montoEgresos = this.getMontoPorArreglo(egresos);
    this.caja.montoIngresos = this.getMontoPorArreglo(ingresos);
    this.caja.ingresos = ingresos
    this.caja.egresos = egresos
    this.caja.cerrado = true
    this.caja.fechaCierre = dateActual;
    this.caja.costoVentas = this.getCostoFactura(facturaFiltrada);
    this.caja.comisionIngresos = this.getComisionIngresos(ingresos);
    await this._cajaService.putCierreCaja(this.caja)
    this._cajaService.cajaActual = null;
    this.montoFijo = null
  }


  getComisionIngresos(ingresos) {
    let monto = 0;
    if (ingresos) {
      for (let index = 0; index < ingresos.length; index++) {
        const ingreso = ingresos[index];
        monto += ingreso.comision;
      }
    }

    return monto
  }

  getMontoPorArreglo(movimientos) {
    let monto = 0;
    if (movimientos) {
      for (let index = 0; index < movimientos.length; index++) {
        const factura = movimientos[index];
        if (factura.es_cuota != true) {
          monto += factura.monto;

        }
      }
    }

    return monto
  }

  getCostoFactura(facturas) {
    let costo = 0;
    if (facturas) {
      for (let index = 0; index < facturas.length; index++) {
        const factura = facturas[index];
        if (factura.es_cuota != true) {
          costo += factura.costo;
        }

      }
    }

    return costo
  }

  registrarMonto(monto) {
    this.montoT = monto
  }

}
