import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsSettings } from '../settings/appsettings';
import { ResponseAccess } from '../Interfaces/ResponseAccess';
import { SignIn } from '../Interfaces/SignIn';

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
}
