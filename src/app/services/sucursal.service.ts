import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/global';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {


  constructor(

    private http: HttpClient) { }

  newSucursal(sucursal) {
    let url = URL_SERVICIOS + '/sucursal/crear_sucursal';
    // url += '?token=' + this._loginService.token;
    return this.http.post(url, sucursal).toPromise().then((resp: any) => {
      return resp
    })
  }
  getSucursales() {
    let url = URL_SERVICIOS + '/sucursal/sucursales';
    // url += '?token=' + this._loginService.token;
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.sucursales
    })
  }
}
