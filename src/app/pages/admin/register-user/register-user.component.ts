import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeneralTableComponent } from '../../../components/general-table/general-table.component';
import { GeneralInputComponent } from '../../../components/general-input/general-input.component';
import { GeneralButtonComponent } from '../../../components/general-button/general-button.component';
import { AccessService } from '../../../services/access.service';
import { User } from '../../../Interfaces/User';
import { UserService } from '../../../services/user.service';
import { SignUpUser } from '../../../Interfaces/SignUpUser';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [GeneralTableComponent, CommonModule, GeneralInputComponent, GeneralButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
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
    { title: 'Rol', key: 'roles' },
  ];

  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formSignUpUser: FormGroup = this.formBuild.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    lastname1: ['', Validators.required],
    lastname2: [''], // No Validators.required here, making it optional
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required]
  });

  constructor(private userService: UserService, private toastr: ToastrService) { }


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
          roles: user.roles?.map(role => ({
            id: role.id,
            name: role.name
          }))
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

  signUpUser() {
    if (this.formSignUpUser.valid) {
      const objeto: SignUpUser = {
        email: this.formSignUpUser.value.email,
        name: this.formSignUpUser.value.name,
        firstName: this.formSignUpUser.value.lastname1,
        lastName: this.formSignUpUser.value.lastname2?.trim() || '', // Ensure lastname2 is handled as optional
        password: this.formSignUpUser.value.password,
        repeatPassword: this.formSignUpUser.value.repeatPassword
      }

      if (objeto.repeatPassword === objeto.password) {
        this.accessService.signUpUser(objeto).subscribe({
          next: (response) => {
            this.toastr.success('En unos momentos sera redirigido al sistema', 'Registro exitoso!');
            setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/register-user']);
              });
            }, 2000);
          },
          error: (error) => {
            console.error(error);
            if (error.status === 401) {
              this.toastr.error('Credenciales incorrectas. Por favor, inténtalo de nuevo.', 'Error de autenticación', {
                timeOut: 2000,
                progressBar: true
              });
            }
          }
        });
      } else {
        this.toastr.error('Las contraseñas no coinciden', 'Error en el registro', {
          timeOut: 2000,
          progressBar: true
        });
      }
    } else {
      this.toastr.error('Por favor, complete todos los campos.', 'Error al registrar al Usuario', {
        timeOut: 2000,
        progressBar: true
      });
    }
  }

}
