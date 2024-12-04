import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RegisterCinemaComponent } from "../register-cinema/register-cinema.component";

@Component({
  selector: 'app-cinemas',
  standalone: true,
  imports: [NavbarComponent, RegisterCinemaComponent],
  templateUrl: './cinemas.component.html',
})
export class CinemasComponent {

}
