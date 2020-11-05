import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from './../config/global';
import { Injectable, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class EgresoService {
  public notificacion = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  getEgresos(desde, hasta){
    let url = URL_SERVICIOS + '/egreso/'+ desde + '?hasta=' + hasta;
    return this.http.get(url).toPromise().then((resp:any) =>{
      return resp.egresos
    })
  }
  setEgreso(egreso){ 
    let url = URL_SERVICIOS + '/egreso';
    return this.http.post(url, egreso).pipe(map((resp: any) => {
      this.notificacion.emit();
      Swal.fire({
        icon: 'success',
        title: 'Egreso registrado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      return resp.factura
    }))
  }

  eliminarEgreso(id){
    let url = URL_SERVICIOS + '/egreso/'+id;
    return this.http.delete(url).pipe(map((resp: any) => {
      this.notificacion.emit();
      Swal.fire({
        icon: 'success',
        title: 'Egreso eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      return resp.factura

    }))  }

}
