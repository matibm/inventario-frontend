import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(
    private http: HttpClient
  ) { }

  buscarFacturas(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/producto/' + termino;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.productos
    }))
  }
  getFacturas(desde) {
    let url = URL_SERVICIOS + '/factura';
    return this.http.get(url);
  }

  setFactura(factura){

    let url = URL_SERVICIOS + '/factura';
    return this.http.post(url, factura).pipe(map((resp: any) => {
      return resp.factura
    }))
  }

}
