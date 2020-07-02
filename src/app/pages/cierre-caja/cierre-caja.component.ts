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
  egresos
  facturaTab = true;
  constructor(public _cierreCajaService: CierreCajaService,
    public _facturaModalService: FacturaModalService
  ) { }

  ngOnInit() {
    this.cargarCierreCajas()
    this._cierreCajaService.notificacion.subscribe((resp) => {

      this.cargarCierreCajas()
    })
  }

  cargarCierreCajas() {
    this._cierreCajaService.getCierreCajas().subscribe((resp: any) => {
      console.log(resp);

      this.cierreCaja = resp.cierreCajas[0];
      this.cierreCajas = resp.cierreCajas.reverse()
      this.facturas = this.cierreCajas[0].facturas
      this.egresos = this.cierreCajas[0].egresos
    })
  }

  verFacturaModal(factura) {
    localStorage.setItem('factura', factura)
    this._facturaModalService.mostrarModal(factura)
  }
  onCierreCaja(cierreCaja) {
    this.cierreCaja = cierreCaja
    this.facturas = cierreCaja.facturas
    this.egresos = cierreCaja.egresos
  }

  switchTab(tab: string) {
    switch (tab) {
      case 'facturas':
        document.getElementById('facturas_tab').className = ' nav-link active'
        document.getElementById('egresos_tab').className = 'nav-link'
        this.facturaTab = true
        break;
      case 'egresos':
        document.getElementById('egresos_tab').className = ' nav-link active'
        document.getElementById('facturas_tab').className = 'nav-link';
        this.facturaTab = false;
        break;
      default:
        break;
    }
  }

  eliminarCaja(caja) {
    this._cierreCajaService.eliminarCierreCaja(caja._id).subscribe();
  }
  eliminarEgreso(egreso) {
    for (let i = 0; i < this.egresos.length; i++) {
      const element = this.egresos[i];
      if (element == egreso) {
        this.egresos.splice(i, 1);
      }
    }

    this.cierreCaja.egresos = this.egresos;
    this._cierreCajaService.putCierreCaja(this.cierreCaja).subscribe();
  }
  eliminarFactura(factura) {
    console.log(this.cierreCaja);
    for (let i = 0; i < this.facturas.length; i++) {
      const element = this.facturas[i];
      if (element == factura) {
        this.facturas.splice(i, 1);
      }
    }

    this.cierreCaja.facturas = this.facturas;
    console.log(this.cierreCaja);

    this._cierreCajaService.putCierreCaja(this.cierreCaja).subscribe((resp: any) => {
      console.log(resp);
      
      this.cierreCaja = resp
    });
  }

}
