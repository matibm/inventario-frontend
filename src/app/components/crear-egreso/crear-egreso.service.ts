import { CierreCajaService } from './../../services/cierre-caja.service';
import { EgresoService } from './../../services/egreso.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrearEgresoService {

  montoT = 0
  motivoT = ''
  egreso
  confirmar: boolean = false;
  oculto: string = 'oculto';
  monto
  motivo
  factura = null
  fecha
  productos = null;
  constructor(
    private _cierreCajaService: CierreCajaService,
    private _egresoService: EgresoService
  ) { }

  ocultarModal(){
    this.factura = null;
      this.oculto = 'oculto';
  }

  cancelarEgreso(){
    this.confirmar = false;
    this.montoT = null;
    this.motivoT = ''
  }

  mostrarModal(){
    
    this.oculto = '';
  }

  registrarMonto(monto) {
    this.montoT = monto;
  }
  registrarMotivo(motivo) {
    this.motivoT = motivo;
  }

  onSubmit() {
    this.confirmar = true;
    var form = document.getElementById("myForm");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);
    let date = new Date()

    let egresoAux = new Object({
      fecha: date.getTime(),
      monto: this.montoT,
      motivo: this.motivoT

    })

    this.egreso = egresoAux

  }

  confirmarGuardar() { 
    let cierrecaja

    let id = localStorage.getItem('idCaja')
    if (id) {
      this._cierreCajaService.getCierreCaja(id).subscribe((resp: any) => {
        this.ocultarModal();
        cierrecaja = resp.cierreCaja
        cierrecaja.montoCierre -= this.montoT
        cierrecaja.egresos.push(this.egreso)
        this._cierreCajaService.putCierreCaja(cierrecaja).subscribe()
        this._egresoService.setEgreso(this.egreso).subscribe();
      })
    }
    
  }  

}
