import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReabastecerService {

  oculto = 'oculto'
  constructor() { }

  public opened = new EventEmitter

  mostrarModal(){
    this.opened.emit()
    this.oculto = ''
  }

  ocultarModal(){
    this.oculto = 'oculto'
  }

}
