import { Component } from '@angular/core';
import { GeneralTableComponent } from "../../components/general-table/general-table.component";
import { CommonModule } from '@angular/common';
import { GeneralInputComponent } from "../../components/general-input/general-input.component";

@Component({
  selector: 'app-register-cinema',
  standalone: true,
  imports: [GeneralTableComponent, CommonModule, GeneralInputComponent],
  templateUrl: './register-cinema.component.html',
  styleUrl: './register-cinema.component.css'
})
export class RegisterCinemaComponent {

  isModalOpen = false;

  cinemas = [
    { id: 1, nombre: 'Cinepolis', ubicación: 'Cartago, Costa Rica', estado: 'En espera' },
    { id: 2, nombre: 'TerraCine', ubicación: 'San Pedro, Costa Rica', estado: 'Aprobado' }
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
