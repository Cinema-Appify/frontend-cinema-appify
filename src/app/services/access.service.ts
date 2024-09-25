import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsSettings } from '../settings/appsettings';
import { ResponseAccess } from '../Interfaces/ResponseAccess';
import { SignIn } from '../Interfaces/SignIn';
import { SignUpUser } from '../Interfaces/SignUpUser';
import { SignUpCinema } from '../Interfaces/SignUpCinema';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
 
  private http = inject(HttpClient);
  private baseUrl: string = appsSettings.apiUrl;

  constructor() { }

  signIn(objeto: SignIn) {
    return this.http.post<ResponseAccess>(this.baseUrl + 'auth/signin', {
      email: objeto.email,
      password: objeto.password
    });
  }

  signUpUser(objeto: SignUpUser) {
    return this.http.post<ResponseAccess>(this.baseUrl + 'auth/signup', {
      email: objeto.email,
      name: objeto.name,
      lastname1: objeto.lastname1,
      lastname2: objeto.lastname2,
      password: objeto.password
    });
  }

  signUpCinema(objeto: SignUpCinema){
    return this.http.post<ResponseAccess>(this.baseUrl + 'auth/signUpCinema', {
      email: objeto.email,
      name: objeto.name,
      password: objeto.password,
      photo: objeto.photo
    });
  }

}
