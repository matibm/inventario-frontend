import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from './../config/global';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }
  public notificacion = new EventEmitter<any>();

  getProveedor(id) {
    let url = URL_SERVICIOS + '/proveedor/' + id;
    return this.http.get(url).toPromise();
  }

  getProveedores() {
    let url = URL_SERVICIOS + '/proveedor/all';
    return this.http.get(url).toPromise();
  }

  buscarProveedor(termino) {
     
    let url = URL_SERVICIOS + '/proveedor/buscar/' + termino;
    return this.http.get(url).toPromise().then(resp => {return resp})
  }

  updateProveedor(id, proveedor){ 
    let url = URL_SERVICIOS + '/proveedor/' + id; 
    return this.http.put(url, proveedor).toPromise(); 
  }

  deleteProveedor(id) {
    let url = URL_SERVICIOS + '/proveedor/' + id;
    return this.http.delete(url).toPromise();
  }

  createProveedor(proveedor) {
    let url = URL_SERVICIOS + '/proveedor';
    console.log(proveedor);
    return this.http.post(url, proveedor).toPromise();
  }

}
