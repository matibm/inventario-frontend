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
  facturas
  egresos
  facturaTab = true;
  constructor(public _cierreCajaService: CierreCajaService,
    public _facturaModalService: FacturaModalService,
    ) { }

  ngOnInit() {
    this.cargarCierreCajas()
  }

  cargarCierreCajas() {
    this._cierreCajaService.getCierreCajas().subscribe((resp: any) => {
      this.cierreCajas = resp.cierreCajas.reverse()
      this.facturas = this.cierreCajas[0].facturas
      this.egresos = this.cierreCajas[0].egresos

    })
  }


  verFacturaModal(factura) {
    localStorage.setItem('factura', factura)
    this._facturaModalService.mostrarModal(factura)
  }
  onCierreCaja(cierreCaja){
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

}
