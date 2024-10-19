import { Component, inject } from '@angular/core';
import { GeneralTableComponent } from "../../../components/general-table/general-table.component";
import { CommonModule } from '@angular/common';
import { GeneralInputComponent } from "../../../components/general-input/general-input.component";
import { Cinema } from '../../../Interfaces/Cinema';
import { CinemaService } from '../../../services/cinema.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeneralButtonComponent } from '../../../components/general-button/general-button.component';
import { AccessService } from '../../../services/access.service';
import { ToastrService } from 'ngx-toastr';
import { CloudinaryService } from '../../../services/cloudinary.service';
import { SignUpCinema } from '../../../Interfaces/SignUpCinema';
import { ResponseAccess } from '../../../Interfaces/ResponseAccess';

@Component({
  selector: 'app-register-cinema',
  standalone: true,
  imports: [GeneralTableComponent, CommonModule, GeneralInputComponent, RouterLink, ReactiveFormsModule, GeneralInputComponent, GeneralButtonComponent],
  templateUrl: './register-cinema.component.html',
  styleUrl: './register-cinema.component.css'
})
export class RegisterCinemaComponent {
  cinemas: Cinema[] = [];
  isModalOpen = false;
  columnNames = [
    { title: 'ID', key: 'id' },
    { title: 'Nombre', key: 'name' },
    { title: 'Correo Electrónico', key: 'email' },
    { title: 'Estado', key: 'state' },
  ];

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

  constructor(private cinemaService: CinemaService, private toastr: ToastrService,
    private cloudinaryService: CloudinaryService) { }

  ngOnInit(): void {
    this.getCinemas();
  }

  getCinemas(): void {
    this.cinemaService.getCinemas().subscribe(
      (data) => {
        console.log(data);
        this.cinemas = data.map((cinema, index) => ({
          id: index + 1, // No es el id real, toma el valor o posicion en el arrglo
          name: cinema.name,
          email: cinema.email,
          state: cinema.state
        }));
        console.log(this.cinemas);
      },
      (error) => {
        console.error('Error fetching cinemas', error);
      }
    );
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
            window.location.reload();
            this.isLoading = false;  // Desactivar el estado de carga
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

}
