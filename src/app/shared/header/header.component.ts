import { CajaModalService } from './../../components/caja-modal/caja-modal.service';
import { Component, OnInit } from '@angular/core';
import { CrearEgresoService } from 'src/app/components/crear-egreso/crear-egreso.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public _egresoModalService: CrearEgresoService,
    public _cajaModalService: CajaModalService
    ) { }

  ngOnInit() {
  }

  cierrDeCaja(){
    this._cajaModalService.mostrarModal()
  }


  registrarEgreso(){
    this._egresoModalService.mostrarModal()
  }

}
