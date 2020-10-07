import { LoginService } from './../../components/login/login.service';
import  Swal  from 'sweetalert2';
import { CrearProductoModalService } from './../../components/crear-producto-modal/crear-producto-modal.service';
import { CajaModalService } from './../../components/caja-modal/caja-modal.service';
import { Component, OnInit } from '@angular/core';
import { CrearEgresoService } from 'src/app/components/crear-egreso/crear-egreso.service';
import { ImprimirFacturaService } from 'src/app/components/imprimir-factura/imprimir-factura.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public _egresoModalService: CrearEgresoService,
    public _cajaModalService: CajaModalService,
    public _crearProductoModalService: CrearProductoModalService,
    public _imprimirFacturaService: ImprimirFacturaService,
    public _loginService: LoginService
    ) { }

  ngOnInit() {
  }

  cierrDeCaja(){
    this._cajaModalService.mostrarModal()
  }


  registrarEgreso(){
    if (!this._cajaModalService.cerrado) {
      this._egresoModalService.mostrarModal()  
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No se puede registrar egreso, abre la caja primero',
        showConfirmButton: true
      });

    }
    
  }

  router(path){
    document.getElementById('homeRoute').remove
  }


}
