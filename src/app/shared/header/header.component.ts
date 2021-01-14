import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { CrearIngresoModalService } from './../../components/crear-ingreso-modal/crear-ingreso-modal.service';
import { CierreCajaService } from './../../services/cierre-caja.service';
import { navBarService } from '../../services/navbar.service';
// import { LoginService } from './../../components/login/login.service';
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
    public _navBarService: navBarService,
    public _egresoModalService: CrearEgresoService,
    public _cajaModalService: CajaModalService,
    public _crearProductoModalService: CrearProductoModalService,
    public _imprimirFacturaService: ImprimirFacturaService,
    public _loginService: LoginService,
    public _cajaService: CierreCajaService,
    public _ingresoModalService: CrearIngresoModalService,
    public route: Router
    ) { }

  async ngOnInit() {
    this._cajaService.cajaActual = await this._cajaService.getCajaAbierta()
     
  }

  cierrDeCaja(){
    this._cajaModalService.mostrarModal()
  }

  

  registrarIngreso(){
    if (this._cajaService.cajaActual) {
      this._ingresoModalService.mostrarModal()
    }else{
      Swal.fire({
        icon: 'error',
        title: 'No se puede registrar ingreso, abre la caja primero',
        showConfirmButton: true
      });

    }
  }

  registrarEgreso(){
    if (this._cajaService.cajaActual) {
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
