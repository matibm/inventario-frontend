import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(
    private http: HttpClient
  ) { }

  getServicio(id){
    
  }
  getServicios(){

  }

  newServicio(servicio){

  }

  updateServicio(){

  }

  removeServicio(){

  }


  buscarServicios(termino){
      
    let url = URL_SERVICIOS + '/proveedor/buscar/' + termino;
    return this.http.get(url).toPromise().then(resp => {return resp})
  }

}
