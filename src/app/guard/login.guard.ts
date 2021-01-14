import { LoginService } from './../services/login.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private _loginService: LoginService){
  }

  canActivate(): boolean { 
    if (this._loginService.itsLogued()) {
      
      return true;
    } else{      
      console.log("redirectlogin");

      this.router.navigateByUrl('/login')
      return false
    }
    

    return true
  }
  
}
