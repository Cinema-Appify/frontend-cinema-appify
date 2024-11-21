import { Component, inject } from '@angular/core';
import { AccessService } from '../../../services/access.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignIn } from '../../../Interfaces/SignIn';
import { GeneralInputComponent } from '../../../components/general-input/general-input.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { GeneralButtonComponent } from '../../../components/general-button/general-button.component';
import { ToastrService } from 'ngx-toastr';
import { heroLockClosedSolid, heroUserSolid } from '@ng-icons/heroicons/solid';
import { ChatbotComponent } from '../../../components/chatbot/chatbot.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, GeneralInputComponent, NgIconComponent, GeneralButtonComponent],
  viewProviders: [provideIcons({ heroUserSolid, heroLockClosedSolid })],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  private accessService = inject(AccessService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;

  public formSignIn: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit() {
    this.formSignIn.get('email')?.valueChanges.subscribe(() => this.emailValid(this.formSignIn));
    this.formSignIn.get('password')?.valueChanges.subscribe(() => this.passwordValid(this.formSignIn));
  }

  emailValid(formGroup: FormGroup) {
    const email = formGroup.get('email');
    if (email?.value !== '') {
      this.invalidEmail = false;
    }
  }

  passwordValid(formGroup: FormGroup) {
    const password = formGroup.get('password');
    if (password?.value !== '') {
      this.invalidPassword = false;
    }
  }

  constructor(private toastr: ToastrService) { }

  signIn() {
    if (this.formSignIn.valid) {
      const objeto: SignIn = {
        email: this.formSignIn.value.email,
        password: this.formSignIn.value.password
      }

      this.accessService.signIn(objeto).subscribe({
        next: (response) => {
          this.toastr.success('En unos momentos sera redirigido al sistema', 'Inicio de sesión exitoso!', {
            timeOut: 2000,
          });
          localStorage.clear();
          localStorage.setItem('token', response.token);
          if (response.roles[0] === 'ROLE_ADMIN' || response.roles[0] === 'ROLE_USER') {
            localStorage.setItem('usuario',
              JSON.stringify({
                id: response.id,
                name: response.name,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                roles: response.roles,
                tokenType: response.tokenType,
              }));
          } else {
            localStorage.setItem('usuario',
              JSON.stringify({
                id: response.id,
                name: response.name,
                email: response.email,
                state: response.state,
                roles: response.roles,
                tokenType: response.tokenType,
              }));
          }

          this.router.navigate(['/home']);
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
      if (this.formSignIn.value.email === '' || !this.formSignIn.value.email.valid) this.invalidEmail = true;
      if (this.formSignIn.value.password === '' || !this.formSignIn.value.password.valid) this.invalidPassword = true;
      this.toastr.error('Por favor, completa el formulario correctamente.', 'Error al iniciar sesión', {
        timeOut: 2000,
      });
    };
  }

  redirectSignUp() {
    this.router.navigate(['/sign-up-user']);
  }
}
