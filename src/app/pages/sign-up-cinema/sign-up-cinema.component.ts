import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { AccessService } from '../../services/access.service';
import { ResponseAccess } from '../../Interfaces/ResponseAccess';
import { GeneralInputComponent } from '../../components/general-input/general-input.component';
import { GeneralButtonComponent } from '../../components/general-button/general-button.component';
import { SignUpCinema } from '../../Interfaces/SignUpCinema';
import { CloudinaryService } from '../../services/cloudinary.service';

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
  private formBuild = inject(FormBuilder);

  public imagePreview: string | ArrayBuffer | null = null;
  private selectedFile: File | null = null;
  public isLoading = false; // Para manejar el estado de carga

  public formSignUpCinema: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', Validators.required],
    photo: [null]
  }, { validators: this.passwordMatchValidator });

  constructor(private toastr: ToastrService, private cloudinaryService: CloudinaryService) { }

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

  async signUpCinema(): Promise<void> {
    if (this.formSignUpCinema.valid) {
      this.isLoading = true;// Activa el estado de cargqa
      let imageUrl: string | null = null;
  
      if (this.selectedFile) {
        try {
          imageUrl = await this.cloudinaryService.uploadImage(this.selectedFile);
          console.log('Imagen subida exitosamente, URL:', imageUrl); // Log para verificar la URL de la imagen
        } catch (error) {
          this.toastr.error('Error al subir la imagen. Inténtelo de nuevo.');
          console.error('Error al subir la imagen:', error); // Log para verificar si ocurre un error en la subida de la imagen
          this.isLoading = false;
          return;
        }
      }
  
      
      const objeto: SignUpCinema = {
        email: this.formSignUpCinema.value.email,
        name: this.formSignUpCinema.value.name,
        password: this.formSignUpCinema.value.password,
        photo: imageUrl
      };
  
      console.log('Datos del formulario enviados:', objeto); // Log para verificar el objeto que se envía al backend
  
      // Llamada al servicio para registrar el cine
      this.accessService.signUpCinema(objeto).subscribe({
        next: (response: ResponseAccess) => {
          console.log('Respuesta del servidor:', response); // Log para verificar la respuesta del servidor
          this.toastr.success('Cine registrado exitosamente. Redirigiendo...');
          setTimeout(() => {
            this.router.navigate(['']);
            this.isLoading = false;  // Desactivar el estado de carga
            this.formSignUpCinema.reset();  // Limpiar el formulario
          }, 2000);
        }, 
        error: (error) => {
          console.error('Error al registrar el cine:', error); // Log para manejar el error si ocurre
          this.toastr.error('Error al registrar el cine. Inténtalo de nuevo.');
          this.isLoading = false;
        }
      });
    } else {
      this.toastr.error('Por favor, completa el formulario correctamente.');
      console.log('Formulario inválido. Errores:', this.formSignUpCinema.errors); // Log para verificar los errores de validación del formulario
    }
  }
  
}
