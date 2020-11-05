import { ServicioService } from './../../services/servicio.service';
import { CrearIngresoModalService } from './crear-ingreso-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-ingreso-modal',
  templateUrl: './crear-ingreso-modal.component.html',
  styleUrls: ['./crear-ingreso-modal.component.scss']
})
export class CrearIngresoModalComponent implements OnInit {

  constructor(
    public _crearIngresoModalService: CrearIngresoModalService,
    public _ServicioService: ServicioService
  ) { }

  ngOnInit() {
  }

}
