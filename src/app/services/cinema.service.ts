import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { appsSettings } from "../settings/appsettings";
import { Observable } from "rxjs";
import { Cinema } from "../Interfaces/Cinema";

@Injectable({
    providedIn: 'root',
})

export class CinemaService{

    private http = inject(HttpClient);
    private baseUrl: string = appsSettings.apiUrl;
  
    constructor() { }

    getCinemas(): Observable<Cinema[]> {
        return this.http.get<Cinema[]>(`${this.baseUrl}auth/getCinemas`);
    }

}