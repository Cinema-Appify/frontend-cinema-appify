import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  nameVar = '';

  ngOnInit(): void {
    this.name();
  }

  name(): void {
    const usuario = localStorage.getItem('usuario');
    this.nameVar = usuario ? JSON.parse(usuario).name : '';
  }
}
