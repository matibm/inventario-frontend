import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public route : Router,public _loginService: LoginService) { }
  errorlogin
  ngOnInit() {
  }
  async login(email, password) {
    let user = await this._loginService.login(email, password)
    this.errorlogin = false;
    if (user) {
      this.route.navigate(['/productos'])
    }else{
      this.errorlogin = true;
    }
  }
}
