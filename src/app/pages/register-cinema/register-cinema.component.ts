import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GeneralInputComponent } from '../../components/general-input/general-input.component';
import { GeneralButtonComponent } from '../../components/general-button/general-button.component';
import { AccessService } from '../../services/access.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseAccess } from '../../Interfaces/ResponseAccess';

@Component({
  selector: 'app-register-cinema',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, GeneralInputComponent, GeneralButtonComponent],
  templateUrl: './register-cinema.component.html',
  styleUrl: './register-cinema.component.css'
})
export class RegisterCinemaComponent {

  private accessService = inject(AccessService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  public formSignUpCinema: FormGroup;
  public imagePreview: string | ArrayBuffer | null = null;
  private selectedFile: File | null = null;

  constructor(private toastr: ToastrService) {
    this.formSignUpCinema = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
      photo: [null]
    }, { validators: this.passwordMatchValidator });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validTypes = ['image/jpeg', 'image/png'];

      console.log('Archivo', file);

      if (!validTypes.includes(file.type)) {
        this.toastr.error('Solo se permiten formatos JPEG y PNG.', 'Tipo de archivo no válido');
        console.log('Tipo de archivo no válido:', file.type);
        return;
      }

      if (file.size > 5000000) { // Límite 5MB
        this.toastr.error('El tamaño del archivo excede el límite de 5MB.', 'Archivo demasiado grande');
        console.log('Tamaño de archivo excedido:', file.size);
        return;
      }

      this.selectedFile = file;

      // Generar vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const repeatPassword = formGroup.get('repeatPassword');
    const isMatch = password && repeatPassword && password.value === repeatPassword.value;
    console.log('Validación de contraseñas:', isMatch ? 'Coinciden' : 'No coinciden');
    return isMatch ? null : { mismatch: true };
  }

  signUpCinema(): void {
    if (this.formSignUpCinema.valid) {
      const formData = new FormData();
      formData.append('email', this.formSignUpCinema.value.email);
      formData.append('name', this.formSignUpCinema.value.name);
      formData.append('password', this.formSignUpCinema.value.password);
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
        console.log('Archivo de imagen agregado a FormData:', this.selectedFile.name);
      }

      console.log('Datos del formulario a enviar:', {
        email: this.formSignUpCinema.value.email,
        name: this.formSignUpCinema.value.name,
        password: this.formSignUpCinema.value.password,
        photo: this.selectedFile ? this.selectedFile.name : 'No hay archivo seleccionado'
      });

      this.accessService.signUpCinema(formData).subscribe({
        next: (response: ResponseAccess) => {
          console.log('Respuesta del servidor:', response);
          this.toastr.success('Cine registrado exitosamente. Redirigiendo...');
          setTimeout(() => this.router.navigate(['']), 2000);
        },
        error: (error) => {
          console.error('Error al registrar el cine:', error);
          this.toastr.error('Error al registrar el cine. Inténtalo de nuevo.');
        }
      });
    } else {
      this.toastr.error('Por favor, completa el formulario correctamente.');
      console.log('Formulario inválido. Errores:', this.formSignUpCinema.errors);
    }
  }
  }
