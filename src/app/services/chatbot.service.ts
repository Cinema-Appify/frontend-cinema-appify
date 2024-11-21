import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsSettings } from '../settings/appsettings';
import { ChatMessage } from '../Interfaces/ChatMessage';

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {

    private http = inject(HttpClient);
    private baseUrl: string = appsSettings.apiUrl;

    constructor() { }

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    chatbot(objeto: ChatMessage) {
        return this.http.post<ChatMessage>(this.baseUrl + 'chatbot/ask', {
            message: objeto.text
        }, { headers: this.getAuthHeaders() });
    }
}
