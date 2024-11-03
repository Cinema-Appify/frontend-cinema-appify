import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GeneralButtonComponent } from '../general-button/general-button.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, GeneralButtonComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movieImg: string;
  @Input() titleMovie: string;
  @Input() cardType: string;
  @Input() genres: Array<string> = [];
  @Input() synopsis: string;
  @Input() duration: string;

  constructor() {
    this.movieImg = '';
    this.titleMovie = '';
    this.cardType = '';
    this.genres = [];
    this.synopsis = '';
    this.duration = '';
  }

  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
