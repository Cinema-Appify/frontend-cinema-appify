import { Component, inject } from '@angular/core';
import { GeneralTableComponent } from '../../../components/general-table/general-table.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GeneralButtonComponent } from '../../../components/general-button/general-button.component';
import { GeneralInputComponent } from '../../../components/general-input/general-input.component';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../../../Interfaces/Movie';
import { MovieService } from '../../../services/movie.service';
import { CloudinaryService } from '../../../services/cloudinary.service';
import { RegisterMovie } from '../../../Interfaces/RegisterMovie';
import { AccessService } from '../../../services/access.service';
import { ResponseAccess } from '../../../Interfaces/ResponseAccess';

@Component({
  selector: 'app-register-movie',
  standalone: true,
  imports: [GeneralTableComponent, CommonModule, GeneralInputComponent, RouterLink, 
    ReactiveFormsModule, GeneralInputComponent, GeneralButtonComponent],
  templateUrl: './register-movie.component.html',
  styleUrl: './register-movie.component.css'
})
export class RegisterMovieComponent {
  public imagePreview: string | ArrayBuffer | null = null;
  private selectedFile: File | null = null;
  public rooms: any[] = [];

  movies: Movie[] = [];

  isModalOpen = false;
  isSynopsisModalOpen = false;
  isImageModalOpen = false;

  selectedSynopsis: string = '';
  selectedPhoto: string | null = null;

  columnNames = [
    { title: 'ID', key: 'id' },
    { title: 'Nombre', key: 'name' },
    { title: 'Sipnosis', key: 'synopsis' },
    { title: 'Duración', key: 'duration' },
    { title: 'Foto', key: 'photo' },
  ];

  private movieService = inject(MovieService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formMovie: FormGroup = this.formBuild.group({
    name: ['', Validators.required],
    synopsis: ['', Validators.required],
    duration: ['', Validators.required],
    photo: [null],
    room: ['', Validators.required]
  });

  constructor(private toastr: ToastrService, private cloudinaryService: CloudinaryService){}

  ngOnInit() {
  
    this.getMovies();
  }

  private getCinemaId(): string{
    const cinemaData = localStorage.getItem('usuario');
    if(cinemaData){
      const cinema = JSON.parse(cinemaData);
      return cinema.id;
    }
    return '';
  }
  
  private getTheaterId(): string{
    return 'Sala1';
  }

  loadRooms(cinemaId: string) {
    this.movieService.getRoomsByCinema(cinemaId).subscribe(
      (rooms) => {
        this.rooms = rooms;  
        console.log(rooms);
      },
      (error) => {
        this.toastr.error('Error al cargar las salas', 'Error');
        console.error(error);
      }
    );
  }

  deleteTheater(movie: string){

  }

  editTheater(movie: string){

  }

  openModal() {
    this.isModalOpen = true;
    const cinemaId = this.getCinemaId();
    console.log(cinemaId);
    if (cinemaId) {
      this.loadRooms(cinemaId);
      console.log(this.rooms)
    }
  }

  
  closeModal() {
    this.isModalOpen = false;
    this.formMovie.reset();
    this.imagePreview = null;
  }

  openSynopsisModal(synopsis: string) {
    this.selectedSynopsis = synopsis;
    this.isSynopsisModalOpen = true;
  }

  openImageModal(photo: string) {
    this.selectedPhoto = photo;
    this.isImageModalOpen = true;
  }

  closeSynopsisModal() {
    this.isSynopsisModalOpen = false;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
  }

  handleViewAction(){
    
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

  getMovies(): void {
    this.movieService.getMovies().subscribe(
      (data) => {
        console.log(data);
        this.movies = data.map((movie, index) => ({
          id: index + 1,
          name: movie.name,
          synopsis: movie.synopsis,
          duration: movie.duration,
          photo: movie.photo
        }));
        console.log("Datos a mostrar",this.movies);
      },
      (error) => {
        console.error('Error fetching cinemas', error);
      }
    );
  }


  async createMovie(): Promise<void> {
    if (this.formMovie.valid) {
      console.log("Formulario no válido:", this.formMovie.errors);
      console.log('InfoNombreTheater', this.formMovie.value.room);
      let imageUrl: string | null = null;
  
      if (this.selectedFile) {
        try {
          imageUrl = await this.cloudinaryService.uploadImage(this.selectedFile);
          console.log('Imagen subida exitosamente, URL:', imageUrl);
        } catch (error) {
          this.toastr.error('Error al subir la imagen. Inténtelo de nuevo.');
          console.error('Error al subir la imagen:', error);
          return;
        }
      }else{
        this.toastr.error('Por Favor seleccione una imagen.', 'Error', {
          timeOut: 2000,
          progressBar: true
        });
        return
      }
      console.log("Imagen subida",imageUrl);
      // Aca contatenamos el "min" al valor de duración
      const durationWithMin = `${this.formMovie.value.duration.trim()} min`;
  
      const objeto: RegisterMovie = {
        name: this.formMovie.value.name.trim(),
        synopsis: this.formMovie.value.synopsis.trim(),
        duration: durationWithMin,  
        photo: imageUrl,
        cinemaId: this.getCinemaId(),
        theaterName: this.getTheaterId()  // Obtenemos el valor de la sala seleccionada
      };
  
      console.log("Datos del formulario", objeto);
  
      this.movieService.registerMovie(objeto).subscribe({
        next: (response: ResponseAccess) => {
          console.log('Respuesta del servidor:', response);
          this.toastr.success('Película registrada exitosamente. Redirigiendo...');
          setTimeout(() => {
            this.formMovie.reset();  // Limpiar el formulario
          }, 2000);
        },
        error: (error) => {
          console.error('Error al registrar la película:', error);
          this.toastr.error('Error al registrar la película. Inténtalo de nuevo.');
        }
      });
    }
  }
  
  

}

  




