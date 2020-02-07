import { EgresoService } from './../../services/egreso.service';
import { CrearEgresoService } from './crear-egreso.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-egreso',
  templateUrl: './crear-egreso.component.html',
  styleUrls: ['./crear-egreso.component.scss']
})
export class CrearEgresoComponent implements OnInit {

  montoT = 0
  motivoT = ''
  egreso
  confirmar: boolean = false;
  constructor(public _crearEgresoService: CrearEgresoService,
    
      private _egresoService: EgresoService
    ) { }

  ngOnInit() {
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

  confirmarGuardar(){
    this._egresoService.setEgreso(this.egreso).subscribe();
  }

}
