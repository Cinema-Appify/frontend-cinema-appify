import { Component } from '@angular/core';
import { GeneralTableComponent } from '../../components/general-table/general-table.component';
import { CommonModule } from '@angular/common';
import { GeneralInputComponent } from '../../components/general-input/general-input.component';
import { GeneralButtonComponent } from "../../components/general-button/general-button.component";

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [GeneralTableComponent, CommonModule, GeneralInputComponent, GeneralButtonComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  isModalOpen = false;

  cinemas = [
    {id: '1', correo: 'prueba@test.com', nombre: 'Pepe', apellido: 'Pedro', apellido2: 'Prueba', rol: 'admin'},
    {id: '2',  correo: 'prueba@test.com', nombre: 'Pepe', apellido: 'Pedro', apellido2: 'Prueba', rol: 'admin'}
  ];

  editCinema(id: number) {
    alert(`Editando cine con id: ${id}`);
  }

  deleteCinema(id: number) {
    alert(`Eliminando cine con id: ${id}`);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
