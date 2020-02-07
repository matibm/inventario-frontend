import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  constructor(private http: HttpClient) { }

  getEgresos(){
    let url = URL_SERVICIOS + '/egreso';
    return this.http.get(url);
  }
  setEgreso(egreso){

    let url = URL_SERVICIOS + '/egreso';
    return this.http.post(url, egreso).pipe(map((resp: any) => {
      return resp.factura
    }))
  }


}
