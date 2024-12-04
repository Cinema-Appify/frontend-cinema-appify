import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RegisterTheaterComponent } from '../register-theater/register-theater.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [NavbarComponent, RegisterTheaterComponent],
  templateUrl: './rooms.component.html',
})
export class RoomsComponent {

}
