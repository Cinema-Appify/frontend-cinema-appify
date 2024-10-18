import { Component, inject } from '@angular/core';
import { GeneralInputComponent } from '../../components/general-input/general-input.component';
import { GeneralButtonComponent } from '../../components/general-button/general-button.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccessService } from '../../services/access.service';
import { repeat } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SignUpUser } from '../../Interfaces/SignUpUser';

@Component({
  selector: 'app-sign-up-user',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, GeneralInputComponent, GeneralButtonComponent],
  templateUrl: './sign-up-user.component.html',
})
export class SignUpUserComponent {
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

  constructor(private toastr: ToastrService) { }

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
            this.toastr.success('En unos momentos sera redirigido al sistema', 'Registro exitoso!', {
              timeOut: 2000,
            });
            this.router.navigate(['']);
          },
          error: (error) => {
            console.error(error);
            if (error.status === 401) {
              this.toastr.error('Credenciales incorrectas. Por favor, inténtalo de nuevo.', 'Error al iniciar sesión', {
                timeOut: 2000,
              });
            }
          }
        });
      } else {
        this.toastr.error('Las contraseñas no coinciden');
        return;
      }
    } else {
      this.toastr.error('Por favor, complete todos los campos.', 'Error al iniciar sesión', {
        timeOut: 2000,
      });
    }
  }
}
