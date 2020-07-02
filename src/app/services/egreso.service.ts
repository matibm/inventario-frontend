import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from './../config/global';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {
  public notificacion = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  getEgresos(){
    let url = URL_SERVICIOS + '/egreso';
    return this.http.get(url);
  }
  setEgreso(egreso){

    let url = URL_SERVICIOS + '/egreso';
    return this.http.post(url, egreso).pipe(map((resp: any) => {
      this.notificacion.emit();
      return resp.factura
    }))
  }

  eliminarEgreso(id){
    let url = URL_SERVICIOS + '/egreso/'+id;
    return this.http.delete(url).pipe(map((resp: any) => {
      this.notificacion.emit();
      
      return resp.factura

    }))  }

}
