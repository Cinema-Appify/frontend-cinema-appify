import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './movies.component.html',
})
export class MoviesComponent {

}
