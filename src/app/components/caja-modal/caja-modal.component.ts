import { CierreCajaService } from './../../services/cierre-caja.service';
import { CajaModalService } from './caja-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caja-modal',
  templateUrl: './caja-modal.component.html',
  styleUrls: ['./caja-modal.component.scss']
})
export class CajaModalComponent implements OnInit {
  montoT

  caja

  cajaCerrada = true;
  constructor(
    public _cajaModalService: CajaModalService,
    public _cierreCajaService: CierreCajaService

  ) { }

  ngOnInit() {

  }

  crearCaja() {
    let date = new Date()
    let caja = {
      facturas: [],
      egresos: [],
      montoInicio: this.montoT,
      fechaInicio: date.getTime(),
      fechaCierre: 0,
      montoCierre: this.montoT,
      cerrado: false
    }    

    this._cierreCajaService.setCierreCaja(caja).subscribe((resp: any) => {
      localStorage.setItem('idCaja', resp._id )
      this._cajaModalService.mostrarModal()
    });
  }


  cerrarCaja(){
    this._cajaModalService.cerrarCaja()
  }

  registrarMonto(monto) {
    this.montoT = monto
  }

}
