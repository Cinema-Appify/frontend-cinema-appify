import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { GeneralButtonComponent } from '../general-button/general-button.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, GeneralButtonComponent],
  templateUrl: './movie-card.component.html',
})
export class MovieCardComponent {
  private router = inject(Router);
  @Input() id: number;
  @Input() movieImg: string;
  @Input() titleMovie: string;
  @Input() cardType: string;
  @Input() genres: Array<string> = [];
  @Input() synopsis: string;
  @Input() duration: number;

  constructor() {
    this.id = 0;
    this.movieImg = '';
    this.titleMovie = '';
    this.cardType = '';
    this.genres = [];
    this.synopsis = '';
    this.duration = 0;
  }

  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }

  handleBuyTickets() {
    this.router.navigate([`${'billboards/' + this.id}`]);
  }
}
