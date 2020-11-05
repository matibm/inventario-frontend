import { CrearServicioModalService } from './crear-servicio-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-servicio-modal',
  templateUrl: './crear-servicio-modal.component.html',
  styleUrls: ['./crear-servicio-modal.component.scss']
})
export class CrearServicioModalComponent implements OnInit {

  constructor(public _crearSerivcioModalService: CrearServicioModalService) { }

  ngOnInit() {
  }

}
