import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  public noficacion = new EventEmitter<any>();

  constructor(
    private http: HttpClient
  ) { }

  buscarFacturas(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/producto/' + termino;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.productos
    }))
  }

  getFacturasPorCliente(idCliente){
    let url = URL_SERVICIOS + '/factura/cliente/' + idCliente
    return this.http.get(url)
  }

  getFacturas(desde) {
    let url = URL_SERVICIOS + '/factura';
    return this.http.get(url);
  }
  getProductosMasVendidos(desde, hasta) {
    let url = URL_SERVICIOS + '/factura/masvendidos';
    return this.http.get(url);
  }

  getProductosVendidosEnFecha(desde, hasta){    
    let url = URL_SERVICIOS + '/factura/productosVendidos/' +desde +'?hasta=' + hasta;
    return this.http.get(url);
  }

  setFactura(factura){

    let url = URL_SERVICIOS + '/factura';
    return this.http.post(url, factura).pipe(map((resp: any) => {
      return resp.factura
    }))
  }
  putFactura(factura){

    let url = URL_SERVICIOS + '/factura/' + factura._id;
    return this.http.put(url, factura).pipe(map((resp: any) => {
      console.log(resp);
      
      return resp.factura
    })) 
  }

  getFacturasSinPagar(){
    let url = URL_SERVICIOS + '/factura/debiendo';
    return this.http.get(url);
  }
  eliminarFactura(factura){
    let url = URL_SERVICIOS + '/factura/' + factura._id;
    return this.http.delete(url).pipe(map((resp: any) => {      
      this.noficacion.emit();
      return resp.factura
    })) 
  }

}
