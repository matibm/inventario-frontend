import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionModalService {

  oculto = 'oculto'

  constructor() { }

  login(odigo) {
    let codigo = parseInt(odigo)
    let date = new Date()
    
    let unaHoraDespues = date

     
    if (date.valueOf() >= (codigo) && (codigo) >= unaHoraDespues.setUTCMinutes(date.getMinutes() - 30)) {
      localStorage.setItem('logged', 'true')
      
      
      this.oculto = ''
      window.location.reload()
    }
    
   
  }

  mostrarModal(){
    this.oculto = ''
  }
}
