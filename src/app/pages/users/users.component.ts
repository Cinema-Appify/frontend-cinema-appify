import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {

}
