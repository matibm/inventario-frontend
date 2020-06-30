import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient
  ) { }
  getClientes(){
    let url = URL_SERVICIOS + '/cliente/';
    return this.http.get(url);
  }
  buscarClientes(termino: string) {
    let url = URL_SERVICIOS + '/cliente/buscar/' + termino;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.clientes
    }))
  }
  getCliente(id){
    let url = URL_SERVICIOS + '/cliente/' + id;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.cliente
    }))
  }
  
  crearCliente(cliente){

    let url = URL_SERVICIOS + '/cliente' ;
    
    return this.http.post(url, cliente).pipe(map((resp: any) => {
        
      return resp.cliente;
    }));
  }

}

