import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  public notificacion = new EventEmitter<any>();

  constructor(
    private http: HttpClient
  ) { }

  getIngresos(desde, hasta) {
    let url = URL_SERVICIOS + '/ingreso/' + desde + '?hasta=' + hasta;
    return this.http.get(url).toPromise().then((resp: any) => {
      
      return resp.ingresos
    })
  }

  getIngreso(id) {

  }

  removeIngreso(id) {
    let url = URL_SERVICIOS + '/ingreso/' + id;
    return this.http.delete(url).toPromise().then((resp: any) => {
      this.notificacion.emit()
      Swal.fire({
        icon: 'success',
        title: 'Ingreso eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      
    })
  }

  newIngreso(ingreso) {
    let url = URL_SERVICIOS + '/ingreso';
    return this.http.post(url, ingreso).toPromise().then((resp: any) => {
      this.notificacion.emit()

      Swal.fire({
        icon: 'success',
        title: 'Ingreso registrado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      
      return resp.ingreso
    }     )
  }

  buscarIngresos(termino) {

  }

}
