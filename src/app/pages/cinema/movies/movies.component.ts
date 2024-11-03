import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RegisterMovieComponent } from '../register-movie/register-movie.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NavbarComponent, RegisterMovieComponent],
  templateUrl: './movies.component.html',
})
export class MoviesComponent {

}
