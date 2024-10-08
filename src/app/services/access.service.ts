import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsSettings } from '../settings/appsettings';
import { ResponseAccess } from '../Interfaces/ResponseAccess';
import { SignIn } from '../Interfaces/SignIn';
import { SignUpUser } from '../Interfaces/SignUpUser';
import { SignUpCinema } from '../Interfaces/SignUpCinema';
import { Observable } from 'rxjs';

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
      firstName: objeto.firstName,
      lastName: objeto.lastName,
      password: objeto.password
    });
  }

  signUpCinema(objeto: SignUpCinema) {
    return this.http.post<ResponseAccess>(`${this.baseUrl}auth/signUpCinema`, {
      email: objeto.email,
      name: objeto.name,
      photo: objeto.photo,
      password: objeto.password
    });
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', file);
    return this.http.post(this.baseUrl + 'auth/uploadImage', formData);
  }
}
