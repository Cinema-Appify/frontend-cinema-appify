import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPowerSolid } from '@ng-icons/heroicons/solid';
import { GeneralButtonComponent } from '../general-button/general-button.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIconComponent, GeneralButtonComponent],
  viewProviders: [provideIcons({ heroPowerSolid })],
  templateUrl: './navbar.component.html',
}
)
export class NavbarComponent implements OnInit {
  private router = inject(Router);

  role(): string {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario).roles[0] : '';
  }

  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  currentRoute: string = '';
  url(): void {
    this.currentRoute = this.router.url;
  }

  nameVar = '';
  firstName = '';
  name(): void {
    const usuario = localStorage.getItem('usuario');
    const parsedUsuario = usuario ? JSON.parse(usuario) : null;
    if (parsedUsuario && (parsedUsuario.roles[0] === 'ROLE_USER' || parsedUsuario.roles[0] === 'ROLE_ADMIN')) {
      this.nameVar = usuario ? JSON.parse(usuario).name : '';
      this.firstName = usuario ? JSON.parse(usuario).firstName : '';
    } else {
      this.nameVar = usuario ? JSON.parse(usuario).name : '';
    }

  }

  ngOnInit(): void {
    this.url();
    this.name();
  }
}
