import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ToastrModule],
  templateUrl: './app.component.html',
  template: `<h1>Hello, {{ title }}</h1>`,
})
export class AppComponent {
  title = 'frontend-cinema-appify';
}