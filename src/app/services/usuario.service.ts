import { URL_SERVICIOS } from './../config/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(
    
    private http: HttpClient) { }

  newUser(user) {
    let url = URL_SERVICIOS + '/usuario';
    // url += '?token=' + this._loginService.token;
    return this.http.post(url, user).toPromise().then((resp: any) => {
     //console.log(resp);
      return resp
    })
  }


  getUsers(){
    let url = URL_SERVICIOS + '/usuario';
    
    return this.http.get(url).toPromise().then((resp: any) => {
     //console.log(resp);
      return resp.usuarios
    })
  }
  getUser(id){
    let url = URL_SERVICIOS + '/user/id/'+id;
     return this.http.get(url).toPromise().then((resp: any) => {
     //console.log(resp);
      return resp.user
    })
  }

  updateUser(user){
    let url = URL_SERVICIOS + '/usuario/'+user._id;
     return this.http.put(url, user).toPromise().then((resp: any) => {
     
      return resp.user
    })
  }
  removeUser(user){
    let url = URL_SERVICIOS + '/user/delete/'+user._id;
     return this.http.put(url, user).toPromise().then((resp: any) => {
     //console.log(resp);
      return resp.user
    })
  }}
