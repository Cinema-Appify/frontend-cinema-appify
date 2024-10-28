import { inject, Injectable } from "@angular/core";
import { appsSettings } from "../settings/appsettings";
import { HttpClient } from "@angular/common/http";
import { RegisterMovie } from "../Interfaces/RegisterMovie";
import { ResponseAccess } from "../Interfaces/ResponseAccess";
import { Observable } from "rxjs";
import { Movie } from "../Interfaces/Movie";

@Injectable({
    providedIn: 'root'
})
export class MovieService{

    private http = inject(HttpClient);
    private baseUrl: string = appsSettings.apiUrl;
  
    constructor() { }

    registerMovie(objeto: RegisterMovie) {
        return this.http.post<ResponseAccess>(`${this.baseUrl}auth/createMovie`, {
          name: objeto.name,
          synopsis: objeto.synopsis,
          duration: objeto.duration,
          photo: objeto.photo,
          cinemaId: objeto.cinemaId,
          theaterName: objeto.theaterName
        });
      }

    getRoomsByCinema(cinemaId: string): Observable<any> {
      return this.http.get<any[]>(`${this.baseUrl}auth/cinema/${cinemaId}/salas`);
    }
      
    getMovies(): Observable<Movie[]> {
      return this.http.get<Movie[]>(`${this.baseUrl}auth/getMovies`);
  }

}