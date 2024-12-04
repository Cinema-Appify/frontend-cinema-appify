import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GeneralInputComponent } from '../../../components/general-input/general-input.component';
import { GeneralButtonComponent } from '../../../components/general-button/general-button.component';
import { AccessService } from '../../../services/access.service';
import { SignUpUser } from '../../../Interfaces/SignUpUser';


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
  invalidEmail: boolean = false;
  invalidName: boolean = false;
  invalidLastName1: boolean = false;
  invalidLastName2: boolean = false;
  invalidPassword: boolean = false;
  invalidRepeatPassword: boolean = false;

  public formSignUpUser: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    lastname1: ['', Validators.required],
    lastname2: [''], // No Validators.required here, making it optional
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit() {
    this.formSignUpUser.get('email')?.valueChanges.subscribe(() => this.emailValid(this.formSignUpUser));
    this.formSignUpUser.get('name')?.valueChanges.subscribe(() => this.nameValid(this.formSignUpUser));
    this.formSignUpUser.get('lastname1')?.valueChanges.subscribe(() => this.lastName1Valid(this.formSignUpUser));
    this.formSignUpUser.get('password')?.valueChanges.subscribe(() => this.passwordValid(this.formSignUpUser));
    this.formSignUpUser.get('repeatPassword')?.valueChanges.subscribe(() => this.repeatPasswordValid(this.formSignUpUser));
  }

  emailValid(formGroup: FormGroup) {
    const email = formGroup.get('email');
    if (email?.value !== '') {
      this.invalidEmail = false;
    }
  }

  nameValid(formGroup: FormGroup) {
    const name = formGroup.get('name');
    if (name?.value !== '') {
      this.invalidName = false;
    }
  }

  lastName1Valid(formGroup: FormGroup) {
    const lastname1 = formGroup.get('lastname1');
    if (lastname1?.value !== '') {
      this.invalidLastName1 = false;
    }
  }

  passwordValid(formGroup: FormGroup) {
    const password = formGroup.get('password');
    if (password?.value !== '') {
      this.invalidPassword = false;
    }
  }

  repeatPasswordValid(formGroup: FormGroup) {
    const repeatPassword = formGroup.get('repeatPassword');
    if (repeatPassword?.value !== '') {
      this.invalidRepeatPassword = false;
    }
  }

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
              this.toastr.error('Error. Por favor, inténtalo de nuevo.', 'Error al registrarse', {
                timeOut: 2000,
              });
            }
          }
        });
      } else {
        this.invalidPassword = true;
        this.invalidRepeatPassword = true;
        this.toastr.error('Las contraseñas no coinciden');
        return;
      }
    } else {
      if (this.formSignUpUser.value.email === '' || !this.formSignUpUser.value.email.valid) this.invalidEmail = true;
      if (this.formSignUpUser.value.name === '') this.invalidName = true;
      if (this.formSignUpUser.value.lastname1 === '') this.invalidLastName1 = true;
      if (this.formSignUpUser.value.password === '' || !this.formSignUpUser.value.password.valid) this.invalidPassword = true;
      if (this.formSignUpUser.value.repeatPassword === '' || !this.formSignUpUser.value.repeatPassword.valid) this.invalidRepeatPassword = true;

      this.toastr.error('Por favor, completa el formulario correctamente.', 'Error al registrarse', {
        timeOut: 2000,
      });
    }
  }
}
