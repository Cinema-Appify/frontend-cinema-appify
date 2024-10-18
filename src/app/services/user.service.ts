import { inject, Injectable } from "@angular/core";
import { appsSettings } from "../settings/appsettings";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../Interfaces/User";

@Injectable({
    providedIn: 'root',
})

export class UserService {

    private http = inject(HttpClient);
    private baseUrl: string = appsSettings.apiUrl;
  
    constructor() { }
    
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}auth/getUsers`);
    }
}