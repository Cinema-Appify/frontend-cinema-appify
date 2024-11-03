import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GeneralButtonComponent } from '../../../components/general-button/general-button.component';
import { GeneralInputComponent } from '../../../components/general-input/general-input.component';
import { GeneralTableComponent } from '../../../components/general-table/general-table.component';
import { ToastrService } from 'ngx-toastr';
import { RegisterTheater } from '../../../Interfaces/RegisterTheater';
import { Theater } from '../../../Interfaces/Theater';
import { TheaterService } from '../../../services/theater.service';

@Component({
  selector: 'app-register-theater',
  standalone: true,
  imports: [GeneralTableComponent, CommonModule, GeneralInputComponent, RouterLink, 
    ReactiveFormsModule, GeneralInputComponent, GeneralButtonComponent],
  templateUrl: './register-theater.component.html',
  styleUrl: './register-theater.component.css'
})
export class RegisterTheaterComponent {

  theaters: Theater[] = [];
  isModalOpen = false;
  columnNames = [
    { title: 'ID', key: 'id' },
    { title: 'Nombre', key: 'name' },
    { title: 'Horarios', key: 'schedule' },
    
  ];


  private theaterService = inject(TheaterService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formTheater: FormGroup = this.formBuild.group({
    name: ['', Validators.required],
    schedule: ['', Validators.required],
  });

  constructor(private toastr: ToastrService){}

  ngOnInit(): void {
    const cinemaId = this.getCinemaId();
    this.getTheaters(cinemaId);
  }


  editTheater(id: number) {
    alert(`Editando cine con id: ${id}`);
  }

  deleteTheater(id: number) {
    alert(`Eliminando cine con id: ${id}`);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.formTheater.reset();
  }


  getTheaters(cinemaId: string): void {
    this.theaterService.getTheaters(cinemaId).subscribe(
      (data) => {
        console.log(data);
        this.theaters = data.map((theater, index) => ({
          id: index + 1,
          name: theater.name,
          schedule: theater.schedule,
        }));
        console.log(this.theaters);
      },
      (error) => {
        console.error('Error fetching cinemas', error);
      }
    );
  }

  private getCinemaId(): string{
    const cinemaData = localStorage.getItem('usuario');
    if(cinemaData){
      const cinema = JSON.parse(cinemaData);
      return cinema.id;
    }
    return '';
  }

  createTheater() {
    if (this.formTheater.valid) {
      const objeto: RegisterTheater = {
        name: this.formTheater.value.name.trim(),
        schedule: this.formTheater.value.schedule.trim(),
        cinemaId: this.getCinemaId()
      };
      console.log(objeto)
      if (objeto.cinemaId != null) {
        this.theaterService.createTheater(objeto).subscribe({
          next: (response) => {
            this.toastr.success('Sala registrada con éxito', 'Registro exitoso!');
            this.closeModal(); 
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
          error: (error) => {
            console.error(error);
            if (error.status === 401) {
              this.toastr.error('Credenciales incorrectas. Por favor, inténtalo de nuevo.', 'Error de autenticación', {
                timeOut: 2000,
                progressBar: true
              });
            } else {
              this.toastr.error('Ocurrió un error al registrar la sala', 'Error', {
                timeOut: 2000,
                progressBar: true
              });
            }
          }
        });
      } else {
        this.toastr.error('No se encontró el ID del cine. Por favor, asegúrate de haber iniciado sesión.', 'Error', {
          timeOut: 2000,
          progressBar: true
        });
      }
    } else {
      this.toastr.error('Por favor, complete todos los campos.', 'Formulario incompleto', {
        timeOut: 2000,
        progressBar: true
      });
    }
  }

}
