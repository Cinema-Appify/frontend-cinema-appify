import { Component, inject } from '@angular/core';
import { AccessService } from '../../services/access.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignIn } from '../../Interfaces/SignIn';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  signIn() {
    if (this.formSignIn.invalid) return;

    const objeto: SignIn = {
      username: this.formSignIn.value.username,
      password: this.formSignIn.value.password
    }

    this.accessService.signIn(objeto).subscribe({
      next: (response) => {
        if (response.accessToken) {
          alert('Autenticación exitosa');
          localStorage.setItem('token', response.accessToken);
          //this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error(error);
        if (error.status === 401) {
          console.log('Credenciales incorrectas. Por favor, inténtalo de nuevo.') // Muestra el error en caso de 401
        }
      }
    });
  }
}
