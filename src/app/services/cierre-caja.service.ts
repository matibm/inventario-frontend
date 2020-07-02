import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CierreCajaService {
  public notificacion = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

  setCierreCaja(cierrecaja) {
    let url = URL_SERVICIOS + '/cierrecaja';
    return this.http.post(url, cierrecaja).pipe(map((resp: any) => {

      return resp.cierreCaja
    }))
  }

  putCierreCaja(cierrecaja) {
    let url = URL_SERVICIOS + '/cierrecaja/' + cierrecaja._id;
    return this.http.put(url, cierrecaja).pipe(map((resp: any) => {
      this.notificacion.emit(resp);
      console.log(resp.cierreCaja);
      
      return resp.cierreCaja
    }))
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

      this.notificacion.emit()
      return resp.cierrecaja
    }))
  }


}
