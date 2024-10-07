import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { AccessService } from '../../services/access.service';
import { ResponseAccess } from '../../Interfaces/ResponseAccess';
import { GeneralInputComponent } from '../../components/general-input/general-input.component';
import { GeneralButtonComponent } from '../../components/general-button/general-button.component';

@Component({
  selector: 'app-sign-up-cinema',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, GeneralInputComponent, GeneralButtonComponent],
  templateUrl: './sign-up-cinema.component.html',
  styleUrls: ['./sign-up-cinema.component.css']
})
export class SignUpCinemaComponent {
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


      if(this.selectedFile){
        this.accessService.uploadImage(this.selectedFile).subscribe({
          next: (uploadResponse) => {
            console.log('Imagen subida correctamente:', uploadResponse);

            formData.append('photo', uploadResponse);

            this.accessService.signUpCinema(formData).subscribe({
              next: (response: ResponseAccess) => {
                console.log('Cine registrado exitosamente:', response);
                this.toastr.success('Cine registrado exitosamente. Redirigiendo...');
                setTimeout(() => this.router.navigate(['']), 2000);
              },
              error: (error) => {
                console.error('Error al registrar el cine:', error);
                this.toastr.error('Error al registrar el cine. Inténtalo de nuevo.');
              }
            });
          },
          error: (error) => {
            console.error('Error al subir la imagen:', error);
            this.toastr.error('Error al subir la imagen. Inténtalo de nuevo.');
          }
        });
      } else {
        // Si no hay imagen, solo registra el cine
        this.accessService.signUpCinema(formData).subscribe({
          next: (response: ResponseAccess) => {
            console.log('Cine registrado exitosamente:', response);
            this.toastr.success('Cine registrado exitosamente. Redirigiendo...');
            setTimeout(() => this.router.navigate(['']), 2000);
          },
          error: (error) => {
            console.error('Error al registrar el cine:', error);
            this.toastr.error('Error al registrar el cine. Inténtalo de nuevo.');
          }
        });
      }
    } else {
      this.toastr.error('Por favor, completa el formulario correctamente.');
      console.log('Formulario inválido. Errores:', this.formSignUpCinema.errors);
    }
  }
}
   