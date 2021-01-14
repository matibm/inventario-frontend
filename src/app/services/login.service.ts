import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('token')
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user) {

      this.id = this.user._id
      if (this.user.role == 'ADMIN_ROLE') {
        this.isAdmin = true;
      }else{ 
        this.isAdmin = false;

      }
    }
  }
    isAdmin = false;
    user 
    token
    id
  login(email, password) {
    let obj = { email: email, password: password }
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, obj).toPromise().then((resp: any) => {
      console.log(resp);
      
      this.guardarStorage(resp.usuario._id, resp.token, resp.usuario)
      return resp.usuario
    }).catch( reason =>{
      return reason.ok;      
    })
  }

  guardarStorage(id: string, token: string, user) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    if (user.role == 'ADMIN_ROLE') {
      this.isAdmin = true;
    }else{ 
      this.isAdmin = false;

    }
    this.user = user;
    this.token = token;
  }

  itsLogued() {
    if (this.token) {
      return (this.token.length > 5) ? true : false

    } else {
      return false

    }

  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.token = null;
    this.user = null;
  }

}
