import { URL_SERVICIOS } from './../config/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  getProveedor(id){
    let url = URL_SERVICIOS + '/proveedor/'+id;
    return this.http.get(url).toPromise();
  }

  getProveedores(){
    let url = URL_SERVICIOS + '/proveedor/all';
    return this.http.get(url).toPromise();
  }

  deleteProveedor(id){
    let url = URL_SERVICIOS + '/proveedor/'+id;
    return this.http.delete(url).toPromise();
  }

  createProveedor(proveedor){
    let url = URL_SERVICIOS + '/proveedor';
  }

}
