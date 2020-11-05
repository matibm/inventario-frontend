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
   
  constructor(public _cierreCajaService: CierreCajaService,
    public _facturaModalService: FacturaModalService,
     public _navBarService: navBarService
  ) { }

  ngOnInit() {
    this._navBarService.navBgColor = 'bg-dark'
    this.cargarCierreCajas()
    this._cierreCajaService.notificacion.subscribe((resp) => {

      this.cargarCierreCajas()
    })
  }

  cargarCierreCajas() {
    this._cierreCajaService.getCierreCajas().subscribe((resp: any) => {
      // console.log(resp);
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

}
