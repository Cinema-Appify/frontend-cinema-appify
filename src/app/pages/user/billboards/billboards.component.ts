import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { SearchInputComponent } from '../../../components/search-input/search-input.component';
import { GeneralSelectComponent } from '../../../components/general-select/general-select.component';
import { Movie } from '../../../Interfaces/Movie';
import { MovieService } from '../../../services/movie.service';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from '../../../components/chatbot/chatbot.component';


@Component({
  selector: 'app-billboards',
  standalone: true,
  imports: [NavbarComponent, MovieCardComponent, SearchInputComponent, GeneralSelectComponent, CommonModule, ChatbotComponent],
  templateUrl: './billboards.component.html',
})
export class BillboardsComponent {

  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    console.log('Cargando películas...'); // Log para verificar que se inicia la carga
    this.movieService.getAllMovies().subscribe({
      next: (data: Movie[]) => {
        console.log('Películas recibidas:', data); // Log para mostrar las películas recibidas
        this.movies = data; // Asignamos los datos obtenidos a la variable de películas
      },
      error: (error) => {
        console.error('Error fetching movies', error); // Log para mostrar el error si ocurre
      }
    });
  }

}
