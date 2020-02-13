import { map } from 'rxjs/operators';
import { CierreCajaService } from './../../services/cierre-caja.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CajaModalService {
  oculto: string = 'oculto';
  monto

  facturas = []
  egresos = []
  fechaInicio
  montoInicio
  montoCierre
  cerrado = true
  caja

  constructor(
    private _cierreCajaService: CierreCajaService
  ) {
    let id = localStorage.getItem('idCaja')
    console.log(id);
    this.caja = null

    if (id) {
      _cierreCajaService.getCierreCaja(id).subscribe((resp: any) => {
        console.log(resp);
        this.caja = resp.cierreCaja
        this.cerrado = resp.cierreCaja.cerrado
      })
    } else {
      this.cerrado = true
    }

  }


  ocultarModal() {

    this.oculto = 'oculto';
  }
  mostrarModal() {
    console.log(this.caja);
    let id = localStorage.getItem('idCaja')
    if (id) {
      this._cierreCajaService.getCierreCaja(id).subscribe((resp: any) => {
        console.log(resp);

        this.caja = resp.cierreCaja
        this.fechaInicio = resp.cierreCaja.fechaInicio
        this.montoInicio = resp.cierreCaja.montoInicio
        this.montoCierre = resp.cierreCaja.montoCierre
        this.cerrado = resp.cierreCaja.cerrado

      })
    } else {
      //this.cerrado = true;
    }

    this.oculto = '';
  }


  cerrarCaja() {
    this.cerrado = true
    this.caja.cerrado = true
    this.caja.fechaCierre = new Date().getTime()
    this._cierreCajaService.putCierreCaja(this.caja).subscribe(resp => {
      console.log(resp);
      this.ocultarModal()
    }, err => {
      if (err) {
        console.log(err);

      }
    })
  }


}
