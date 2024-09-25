import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GeneralInputComponent } from '../../components/general-input/general-input.component';
import { GeneralButtonComponent } from '../../components/general-button/general-button.component';
import { SignUpCinema } from '../../Interfaces/SignUpCinema';
import { ResponseAccess } from '../../Interfaces/ResponseAccess';
import { AccessService } from '../../services/access.service';

@Component({
  selector: 'app-sign-up-cinema',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, GeneralInputComponent, GeneralButtonComponent],
  templateUrl: './sign-up-cinema.component.html',
  styleUrl: './sign-up-cinema.component.css'
})
export class SignUpCinemaComponent {
  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formSignUpCinema: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]], // Validación como correo electrónico
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]], // Validación de contraseña
    repeatPassword: ['', Validators.required],
    photo: [null] // Campo para la imagen (opcional)
  });

  constructor(private toastr: ToastrService) { }

  // Manejo de la selección de imagen
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formSignUpCinema.patchValue({ photo: file });
    }
  }

  // Método para registrar el cine
  signUpCinema() {
    if (this.formSignUpCinema.valid) {
      const objeto: SignUpCinema = {
        email: this.formSignUpCinema.value.email,
        name: this.formSignUpCinema.value.name,
        password: this.formSignUpCinema.value.password,
        repeatPassword: this.formSignUpCinema.value.repeatPassword,
        photo: this.formSignUpCinema.value.photo
      }

      // Verificación si las contraseñas coinciden
    
      if (objeto.password === objeto.repeatPassword) {
        this.accessService.signUpCinema(objeto).subscribe({
          next: (response: ResponseAccess) => {  // Tipo explícito
            this.toastr.success('Cine registrado exitosamente. Redirigiendo...', 'Registro exitoso!', {
              timeOut: 2000,
            });
            this.router.navigate(['/dashboard']);
          },
          error: (error: any) => {  // Tipo explícito
            console.error(error);
            this.toastr.error('Error al registrar el cine. Inténtalo de nuevo.', 'Error', {
              timeOut: 2000,
            });
          }
        });
      } else {
        this.toastr.error('Las contraseñas no coinciden.', 'Error de validación', {
          timeOut: 2000,
        });
      }
      

    }
  }
}
