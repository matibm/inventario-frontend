import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable, EventEmitter } from '@angular/core';
import { resolve } from 'url';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class CierreCajaService {
  public notificacion = new EventEmitter<any>();
  constructor(private http: HttpClient) { }
  public cajaActual;
  setCierreCaja(cierrecaja) {
    let url = URL_SERVICIOS + '/cierrecaja';
    return this.http.post(url, cierrecaja).toPromise().then((resp: any) => {
      this.notificacion.emit()
      Swal.fire({
        icon: 'success',
        title: 'Caja Abierta Correctamente',
        showConfirmButton: false,
        timer: 1000
      });
       return resp.cierreCaja
    })
  }

  putCierreCaja(cierrecaja) {
    console.log(cierrecaja);
    
    let url = URL_SERVICIOS + '/cierrecaja/' + cierrecaja._id;
    return this.http.put(url, cierrecaja).toPromise().then((resp: any) => {
     this.notificacion.emit()
      Swal.fire({
        icon: 'success',
        title: 'Caja Cerrada Correctamente',
        showConfirmButton: false,
        timer: 1000
      });
      this.cajaActual = resp.cierreCaja
      return resp.cierreCaja
    })
  }
  getCierreCajasFiltrado(desde, hasta) {
    let url = URL_SERVICIOS + '/cierrecaja/filtrar/' + desde + '?hasta=' + hasta;
    return this.http.get(url);
  }
  getCierreCaja(id) {
    let url = URL_SERVICIOS + '/cierrecaja/' + id
    return this.http.get(url);
  }

  getCierreCajas() {
    let url = URL_SERVICIOS + '/cierrecaja';
    return this.http.get(url);
  }

  eliminarCierreCaja(id) {
    let url = URL_SERVICIOS + '/cierrecaja/' + id;
    return this.http.delete(url).pipe(map((resp: any) => {
      this.cajaActual = null;
      Swal.fire({
        icon: 'success',
        title: 'Cierre de Caja eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.notificacion.emit()
      return resp.cierrecaja
    }))
  }


  getCajaAbierta(){
    let url = URL_SERVICIOS + '/cierrecaja/abierta/'  ;
    return this.http.get(url).toPromise().then((resp:any)=>{
      return resp.caja;
    })
  }

}
