import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  oculto = 'oculto';
  registrado
  pass
  logued;
  constructor() {
    this.registrado = localStorage.getItem('registrado');
    if (localStorage.getItem('logued') == 'true') {
      this.logued = true;
    }


  }


  ocultarModal() {
    this.oculto = 'oculto'
  }
  mostrarModal() {
    this.oculto = ''
  }

  registrar(f) {
    localStorage.setItem('password', f.value.password);
    localStorage.setItem('registrado', 'registrado')
    this.registrado = 'registrado';
    this.pass = f.value.password;
    this.ingresar(f);
  }

  ingresar(form) {
    let pass = localStorage.getItem('password');
    if (pass == this.pass) {
      this.logued = true;
      localStorage.setItem('logued', 'true');
      this.pass = null;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña incorrecta',
        showConfirmButton: true
      });

    }
    this.pass = null;
    this.ocultarModal();

  }
  logout() {
    this.logued = false;
    localStorage.setItem('logued', 'false');
  }

}
