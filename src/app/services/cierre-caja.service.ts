import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CierreCajaService {

  constructor(private http: HttpClient) { }

  setCierreCaja(cierrecaja) {
    let url = URL_SERVICIOS + '/cierrecaja';
    return this.http.post(url, cierrecaja).pipe(map((resp: any) => {
      console.log(resp);
      
      return resp.cierreCaja
    }))
  }

  putCierreCaja(cierrecaja) {
    let url = URL_SERVICIOS + '/cierrecaja/' + cierrecaja._id;
    return this.http.put(url, cierrecaja).pipe(map((resp: any) => {
  
      console.log(resp);
      
      return resp.cierrecaja
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


}
