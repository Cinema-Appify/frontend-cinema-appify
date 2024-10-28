import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { appsSettings } from "../settings/appsettings";
import { Theater } from "../Interfaces/Theater";
import { Observable } from "rxjs";
import { ResponseAccess } from "../Interfaces/ResponseAccess";
import { RegisterTheater } from "../Interfaces/RegisterTheater";

@Injectable({
    providedIn: 'root'
})

export class TheaterService{
    
    private http = inject(HttpClient);
    private baseUrl: string = appsSettings.apiUrl;
  
    constructor() { }

    getTheaters(): Observable<Theater[]> {
        return this.http.get<Theater[]>(`${this.baseUrl}auth/getAllTheaters`);
    }

    createTheater(objeto: RegisterTheater){
        return this.http.post<ResponseAccess>(this.baseUrl + 'auth/createTheater',{
            name: objeto.name,
            schedule: objeto.schedule,
            cinemaId: objeto.cinemaId
        });
    }

    
}