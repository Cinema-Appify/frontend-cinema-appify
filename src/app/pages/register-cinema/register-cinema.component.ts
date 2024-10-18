import { Component } from '@angular/core';
import { GeneralTableComponent } from "../../components/general-table/general-table.component";
import { CommonModule } from '@angular/common';
import { GeneralInputComponent } from "../../components/general-input/general-input.component";
import { Cinema } from '../../Interfaces/Cinema';
import { CinemaService } from '../../services/cinema.service';

@Component({
  selector: 'app-register-cinema',
  standalone: true,
  imports: [GeneralTableComponent, CommonModule, GeneralInputComponent],
  templateUrl: './register-cinema.component.html',
  styleUrl: './register-cinema.component.css'
})
export class RegisterCinemaComponent {
  cinemas: Cinema[] = [];
  isModalOpen = false;
  columnNames = [
    { title: 'ID', key: 'id' },
    { title: 'Nombre', key: 'name' },
    { title: 'Correo Electrónico', key: 'email' },
    { title: 'Estado', key: 'state' },
  ];
  constructor(private cinemaService: CinemaService){}

  ngOnInit(): void {
    this.getCinemas();
  }

  getCinemas(): void {
    this.cinemaService.getCinemas().subscribe(
      (data) => {
        console.log(data);
        this.cinemas = data.map((cinema, index) => ({
          id: index + 1, // No es el id real, toma el valor o posicion en el arreglo
          name: cinema.name,
          email: cinema.email,
          state: cinema.state
        }));
        console.log(this.cinemas);
      },
      (error) => {
        console.error('Error fetching cinemas', error);
      }
    );
  }
  
  

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
