import { navBarService } from './../../services/navbar.service';
import { FacturaService } from './../../services/factura.service';
import { FacturaModalService } from './../../components/factura-modal/factura-modal.service';
import { CierreCajaService } from './../../services/cierre-caja.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cierre-caja',
  templateUrl: './cierre-caja.component.html',
  styleUrls: ['./cierre-caja.component.scss']
})
export class CierreCajaComponent implements OnInit {

  diaDesde: number
  mesDesde
  yearDesde
  productosVendidos
  semanaDesde: Date
  diaHasta
  hasta
  mesHasta
  arraySemanal
  yearHasta
  dateDesde: Date
  dateHasta: Date = new Date();
  ventasSemanales
  fechasSemanales
  ventasDiarias
  fechasDiarias
  diaVentaSemanal
  mesVentaSemanal
  yearVentaSemanal
  diaVentaDiaria
  mesVentaDiaria
  infoSemanal
  diariasBoolean = false;
  yearVentaDiaria

  cierreCajas
  cierreCaja
  facturas
  ingresos
  egresos
  facturaTab = true;
  tab = 'factura'

  montoVentas = 0;
  montoIngresos = 0;
  montoEgresos = 0;
  comision = 0;
  costo = 0;
  montoFijo = 0;
   
  cajaIngreso
  cajaEgreso
  cajaCosto

  constructor(public _cierreCajaService: CierreCajaService,
    public _facturaModalService: FacturaModalService,
     public _navBarService: navBarService
  ) { }

  ngOnInit() {
    this.setFechas()
    this._navBarService.navBgColor = 'bg-dark'
    this.cargarCierreCajas()
    this._cierreCajaService.notificacion.subscribe((resp) => {

      this.cargarCierreCajas()
    })
  }

  cargarCierreCajas() {
    this._cierreCajaService.getCierreCajasFiltrado(this.dateDesde.valueOf(), this.dateHasta.valueOf()).subscribe((resp: any) => {
      console.log(resp);
      if (!resp.cierreCajas[0]) {
        return;
      }
      this.cierreCaja = resp.cierreCajas[0];
      this.cierreCajas = resp.cierreCajas.reverse()
      let caja = this.cierreCajas[0];

      this.facturas = this.cierreCajas[0].facturas
      this.egresos = this.cierreCajas[0].egresos
      this.ingresos = this.cierreCajas[0].ingresos
      this.montoEgresos = caja.montoEgresos
      this.montoVentas = caja.montoVentas
      this.montoIngresos = caja.montoIngresos
      this.comision = caja.comisionIngresos
      this.costo = caja.costoVentas
      this.montoFijo = caja.montoFijo
      console.log(caja);
      this.sumarCierres(resp.cierreCajas)
    })
  }

  verFacturaModal(factura) {
    localStorage.setItem('factura', factura)
    this._facturaModalService.mostrarModal(factura, true)
  }
  onCierreCaja(cierreCaja) {
    this.cierreCaja = cierreCaja
    this.facturas = cierreCaja.facturas
    this.egresos = cierreCaja.egresos
    this.montoEgresos = cierreCaja.montoEgresos
    this.montoVentas = cierreCaja.montoVentas
    this.montoIngresos = cierreCaja.montoIngresos
    this.comision = cierreCaja.comisionIngresos
    this.costo = cierreCaja.costoVentas
    this.montoFijo = cierreCaja.montoFijo



  }

  switchTab(tab: string) {
    switch (tab) {
      case 'facturas':
        document.getElementById('facturas_tab').className = ' nav-link active'
        document.getElementById('egresos_tab').className = 'nav-link'
        document.getElementById('ingresos_tab').className = ' nav-link '

        this.facturaTab = true
        this.tab = 'factura'
        break;
      case 'egresos':
        document.getElementById('egresos_tab').className = ' nav-link active'
        document.getElementById('facturas_tab').className = 'nav-link';
        document.getElementById('ingresos_tab').className = ' nav-link '

        this.facturaTab = false;
        this.tab = 'egreso';
        break;
      case 'ingresos':
        document.getElementById('ingresos_tab').className = ' nav-link active'
        document.getElementById('facturas_tab').className = 'nav-link';
        document.getElementById('egresos_tab').className = 'nav-link';
        this.facturaTab = false;
        this.tab = 'ingreso';
        break;
      default:
        break;
    }

  }

  eliminarCaja(caja) {
    this._cierreCajaService.eliminarCierreCaja(caja._id).subscribe();
  }
  async eliminarEgreso(egreso) {
    for (let i = 0; i < this.egresos.length; i++) {
      const element = this.egresos[i];
      if (element == egreso) {
        this.egresos.splice(i, 1);
      }
    }

    // this.cierreCaja.egresos = this.egresos;
    // await  this._cierreCajaService.putCierreCaja(this.cierreCaja) 
  }
  async eliminarFactura(factura) {
    for (let i = 0; i < this.facturas.length; i++) {
      const element = this.facturas[i];
      if (element == factura) {
        this.facturas.splice(i, 1);
      }
    }

    // this.cierreCaja.facturas = this.facturas;

    // this.cierreCaja = await this._cierreCajaService.putCierreCaja(this.cierreCaja) 
  }


  hoy
  setFechas() {
    this.dateDesde = new Date()
    this.hoy = new Date()

    this.semanaDesde = new Date(this.dateDesde.setFullYear(this.dateDesde.getFullYear(), this.dateDesde.getMonth(), this.dateDesde.getDate().valueOf() - 7))
    this.dateDesde = this.semanaDesde;

    this.dateDesde.setUTCHours(0, 0, 0);
    this.dateHasta.setUTCHours(23, 59, 0);

    this.diaDesde = this.dateDesde.getDate();
    this.mesDesde = this.dateDesde.getMonth() + 1;
    this.yearDesde = this.dateDesde.getFullYear();

    this.diaHasta = this.hoy.getUTCDate();
    this.mesHasta = this.hoy.getUTCMonth() + 1;
    this.yearHasta = this.hoy.getUTCFullYear();

    this.diaVentaSemanal = this.diaHasta;
    this.mesVentaSemanal = this.mesHasta;
    this.yearVentaSemanal = this.yearHasta;

    this.diaVentaDiaria = this.diaHasta;
    this.mesVentaDiaria = this.mesHasta;
    this.yearVentaDiaria = this.yearHasta;


  }

  cajaServicios
  sumarCierres(cierres){
    let ingreso = 0 
    let costo = 0 
    let egreso = 0
    let servicios = 0 
    for (let i = 0; i < cierres.length; i++) {
      const cierre = cierres[i];
      ingreso += cierre.montoVentas
      costo += cierre.costoVentas
      servicios += cierre.montoIngresos
      egreso += cierre.montoEgresos
    }
    this.cajaCosto = costo
    this.cajaIngreso = ingreso
    this.cajaServicios = servicios
    this.cajaEgreso = egreso
  }


  filtrar() {
    let date = new Date();
    let desde = new Date(date.setUTCFullYear(this.yearDesde, this.mesDesde - 1, this.diaDesde));
    desde.setUTCHours(0, 0, 0)

    date = new Date();
    let hasta = new Date(date.setUTCFullYear(this.yearHasta, this.mesHasta - 1, this.diaHasta));
    hasta.setUTCHours(23, 59, 59)
    this.dateDesde = desde;;
    this.dateHasta = hasta;
    this.cargarCierreCajas()
  }

}
