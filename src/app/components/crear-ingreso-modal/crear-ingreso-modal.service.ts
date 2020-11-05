import { IngresoService } from './../../services/ingreso.service';
import { ServicioService } from './../../services/servicio.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrearIngresoModalService {
  servicios
  oculto = 'oculto'
  servicio
  nombre
  monto
  comision
  
  constructor(
    public _servicioService: ServicioService,
    public _ingresoService: IngresoService
  ) { }

  ocultarModal(){
    this.nombre = null
    this.monto = null
    this.comision = null
    this.oculto = 'oculto'
  }

  mostrarModal(){
    this.oculto = ''
  }


  async crearIngreso(){
    let date = new Date().valueOf()

    let ingreso = {
      nombre: this.nombre,
      monto: this.monto,
      comision: this.comision,
      fecha: date
    }
    this.ocultarModal()
    await this._ingresoService.newIngreso(ingreso)
    

  }

  async buscarServicio(termino){
 if (termino) {

      let resp: any = await this._servicioService.buscarServicios(termino);

      this.servicios = resp.servicios;
      
      if (this.servicios.length == 0) {
        this.monto = 0;
        this.comision = 0;
        this.servicio = null;
      }

    } else {
      this.monto = 0;
        this.comision = 0;
        this.servicio = null;
    }

  }



}
