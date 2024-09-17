import { Component, inject } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignIn } from '../../Interfaces/SignIn';
import { GeneralInputComponent } from '../../components/general-input/general-input.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUserSolid } from '@ng-icons/heroicons/solid';
import { GeneralButtonComponent } from '../../components/general-button/general-button.component';
import { ToastrService } from 'ngx-toastr';
import { TokenType } from '@angular/compiler';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, GeneralInputComponent, NgIconComponent, GeneralButtonComponent],
  viewProviders: [provideIcons({ heroUserSolid })],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formSignIn: FormGroup = this.formBuild.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private toastr: ToastrService) { }

  signIn() {
    if (this.formSignIn.valid) {
      const objeto: SignIn = {
        username: this.formSignIn.value.username,
        password: this.formSignIn.value.password
      }

      this.accessService.signIn(objeto).subscribe({
        next: (response) => {
          this.toastr.success('En unos momentos sera redirigido al sistema', 'Inicio de sesión exitoso!', {
            timeOut: 2000,
          });
          localStorage.clear();
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('usuario',
            JSON.stringify({
              id: response.id,
              username: response.username,
              email: response.email,
              roles: response.roles,
              tokenType: response.tokenType,
            }));
          //this.router.navigate(['/home']);
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
      this.toastr.error('Por favor, complete todos los campos.', 'Error al iniciar sesión', {
        timeOut: 2000,
      });
    };


  }

  redirectSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
