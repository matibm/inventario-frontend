import Swal from 'sweetalert2'
import { ProveedorService } from './../../services/proveedor.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedorModalService {
  oculto = 'oculto'
  proveedor
  nombre
  telefono
  comentario
  ruc
  persona_contacto
  direccion
  email
  public notificacion = new EventEmitter<any>();

  constructor(
    public _proveedorService: ProveedorService
  ) { }


  async guardar() {
    let proveedor = {
      nombre: this.nombre,
      telefono: this.telefono,
      ruc: this.ruc,
      persona_contacto: this.persona_contacto,
      direccion: this.direccion,
      email: this.email,
      comentario: this.comentario
    }

    let resp = await this._proveedorService.updateProveedor(this.proveedor._id, proveedor)
    this.oculto = 'oculto'
    this.notificacion.emit()
    Swal.fire({
      icon: 'success',
      title: 'proveedor modificado',
      showConfirmButton: false,
      timer: 1500
    })
    console.log(resp);

  }

  mostrarModal(proveedor) {
    this.proveedor = proveedor
    this.nombre = proveedor.nombre
    this.telefono = proveedor.telefono
    this.ruc = proveedor.ruc
    this.persona_contacto = proveedor.persona_contacto
    this.direccion = proveedor.direccion
    this.email = proveedor.email
    this.comentario = proveedor.comentario
    this.oculto = ''
  }

}
