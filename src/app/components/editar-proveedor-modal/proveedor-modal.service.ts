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
  public notificacion = new EventEmitter<any>();

  constructor(
    public _proveedorService: ProveedorService
  ) { }


  async guardar() {
    let proveedor = {
      nombre: this.nombre,
      telefono: this.telefono,
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
    this.comentario = proveedor.comentario
    this.oculto = ''
  }

}
