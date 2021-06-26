import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }


    recuperar(login) {

    let user = new User();
    user.login = login;

    return this.http.post(AppConstants.getBaseUrlPath + 'recuperar/', user).subscribe(data => {
      alert(JSON.parse(JSON.stringify(data)).error);
    },
      error => {
        alert('erro recuperar login');
        console.log('erro recuperar login');
      });
  }


  login(usuario: { login: string; senha: string; }) {
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {
      const token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];
      localStorage.setItem('token', token);
      this.router.navigate(['home']);
    },
      error => {
        alert('Acesso Negado!');
        console.log(error);
      });
  }





}
