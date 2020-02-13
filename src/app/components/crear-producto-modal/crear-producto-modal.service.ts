import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CrearProductoModalService {

  public notificacion = new EventEmitter<any>();

  oculto = 'oculto'
  constructor() { }

  ocultarModal(){
    this.oculto = 'oculto'
  }
  mostrarModal(){
    this.oculto = ''
  }


}
