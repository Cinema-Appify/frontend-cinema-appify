import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {

}
