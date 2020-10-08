import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from './../config/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  getProveedor(id) {
    let url = URL_SERVICIOS + '/proveedor/' + id;
    return this.http.get(url).toPromise();
  }

  getProveedores() {
    let url = URL_SERVICIOS + '/proveedor/all';
    return this.http.get(url).toPromise();
  }

  buscarProveedor(termino) {
    console.log(termino);
    
    let url = URL_SERVICIOS + '/proveedor/buscar/' + termino;
    return this.http.get(url).pipe(map((resp: any) => {
      console.log(resp);
      
      return resp.proveedores
    }))
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
