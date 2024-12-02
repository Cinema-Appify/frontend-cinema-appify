import { Component, inject } from '@angular/core';
import { GeneralButtonComponent } from '../general-button/general-button.component';
import { GeneralInputComponent } from '../general-input/general-input.component';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroSparklesSolid, heroUserSolid } from '@ng-icons/heroicons/solid';
import { ChatMessage } from '../../Interfaces/ChatMessage';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [GeneralButtonComponent, GeneralInputComponent, CommonModule, NgIconComponent, ReactiveFormsModule],
  viewProviders: [provideIcons({ heroSparklesSolid, heroUserSolid })],
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent {
  chatBotWindow = false; // Controla si la ventana del chatbot está abierta o cerrada
  messages: ChatMessage[] = []; // Almacena los mensajes de la conversación

  public formBuild = inject(FormBuilder); // Inyecta el servicio FormBuilder
  private chatbotService = inject(ChatbotService); // Inyecta el servicio AccessService

  public formChatbot: FormGroup = this.formBuild.group({
    message: ['', [Validators.required]], // Controla el campo del mensaje
  });

  constructor(private toastr: ToastrService) { }

  openChatbot() {
    this.chatBotWindow = !this.chatBotWindow; // Alterna el estado de la ventana
  }

  chatbot() {
    if (this.formChatbot.valid) {
      const userMessage = this.formChatbot.value.message; // Obtiene el mensaje del usuario

      const objeto: ChatMessage = {
        sender: 'You',
        text: userMessage
      };

      this.messages.push(objeto); // Agrega el mensaje del usuario al chat

      this.chatbotService.chatbot(objeto).subscribe({
        next: (response) => {
          
          const aiMessage = Array.isArray(response) 
          ? response[0]?.generated_text || 'No response from AI' 
          : response?.message || response?.generated_text || 'No response from AI'; 
        
        
        // Agregar el mensaje con el formato adecuado
        this.messages.push({ sender: 'AI', text: aiMessage });
        

          this.formChatbot.reset();
        },
        error: (error) => {
          console.error(error);
          if (error.status === 401) {
            this.toastr.error(
              'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
              'Error al iniciar sesión',
              { timeOut: 2000 }
            );
          } else {
            this.toastr.error(
              'Ha ocurrido un error. Inténtalo más tarde.',
              'Error',
              { timeOut: 2000 }
            );
          }
        }
      });
    } else {
      this.toastr.error(
        'Por favor, completa el formulario correctamente.',
        'Error al enviar mensaje',
        { timeOut: 2000 }
      );
    }
  }
}