import { inject, Injectable } from "@angular/core";
import { appsSettings } from "../settings/appsettings";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResponseAccess } from "../Interfaces/ResponseAccess";
import { Observable } from "rxjs";
import { Movie } from "../Interfaces/Movie";
import { RegisterMovie } from "../Interfaces/RegisterMovie";

@Injectable({
    providedIn: 'root'
})
export class MovieService{

    private http = inject(HttpClient);
    private baseUrl: string = appsSettings.apiUrl;
  
    constructor() { }

    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token'); 
      return new HttpHeaders({
          'Authorization': `Bearer ${token}` 
      });
  }

  registerMovie(objeto: RegisterMovie): Observable<ResponseAccess> {
      return this.http.post<ResponseAccess>(`${this.baseUrl}auth/createMovie`, {
          name: objeto.name,
          synopsis: objeto.synopsis,
          duration: objeto.duration,
          photo: objeto.photo,
          cinemaId: objeto.cinemaId,
          theaterName: objeto.theaterName
      }, { headers: this.getAuthHeaders() }); 
  }

  getRoomsByCinema(cinemaId: string): Observable<any> {
      return this.http.get<any[]>(`${this.baseUrl}auth/cinema/${cinemaId}/salas`, { headers: this.getAuthHeaders() }); 
  }

  getMovies(cinemaId: string): Observable<Movie[]> {
      return this.http.get<Movie[]>(`${this.baseUrl}auth/cinema/${cinemaId}/movies`, { headers: this.getAuthHeaders() }); 
  }

  getAllMovies(): Observable<Movie[]> {
      return this.http.get<Movie[]>(`${this.baseUrl}auth/movie/getAll`, { headers: this.getAuthHeaders() }); 
  }

  deleteMovie(movieName: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}auth/movie/deleteMovie/${movieName}`, { headers: this.getAuthHeaders() }); 
  }
}

