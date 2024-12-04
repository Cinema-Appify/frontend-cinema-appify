import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RegisterUserComponent } from "../register-user/register-user.component";


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, RegisterUserComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {

}
