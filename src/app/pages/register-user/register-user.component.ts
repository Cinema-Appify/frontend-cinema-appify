import { Component } from '@angular/core';
import { GeneralTableComponent } from '../../components/general-table/general-table.component';
import { CommonModule } from '@angular/common';
import { GeneralInputComponent } from '../../components/general-input/general-input.component';
import { GeneralButtonComponent } from "../../components/general-button/general-button.component";
import { User } from '../../Interfaces/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [GeneralTableComponent, CommonModule, GeneralInputComponent, GeneralButtonComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  users: User[] = [];
  isModalOpen = false;
  columnNames = [
    { title: 'ID', key: 'id' },
    { title: 'Correo Electrónico', key: 'email' },
    { title: 'Nombre', key: 'name' },
    { title: 'Apellido', key: 'firstName' },
    { title: 'Apellido2', key: 'lastName' },
    { title: 'Rol', key: 'role' },
  ];

  constructor(private userService: UserService){}


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        console.log(data);
        this.users = data.map((user, index) => ({
          id: index + 1, // O usar el ID real si está disponible
          name: user.name,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles
        }));
        console.log(this.users);
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
