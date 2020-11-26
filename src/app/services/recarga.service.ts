import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecargaService {
  public noficacion = new EventEmitter<any>();

  constructor(
    private http: HttpClient

  ) { }

  getRecargaById(id) {
    let url = URL_SERVICIOS + '/recarga/' + id;
    return this.http.get(url).toPromise();
  }

  getRecargaFiltrado(desde, hasta) {
    let url = URL_SERVICIOS + '/recarga/filtro/' + desde + '?hasta=' + hasta;
    return this.http.get(url).toPromise();
  }

  deleteRecarga(recarga) {
    let url = URL_SERVICIOS + '/recarga/' + recarga._id;
    return this.http.delete(url).pipe(map((resp: any) => {
      this.noficacion.emit();
      return resp
    }))
  }
  crearRecarga(recarga) {
    let url = URL_SERVICIOS + '/recarga';
    return this.http.post(url, recarga).toPromise().then((resp: any) => {
      return resp.recarga
    });
  }
}
