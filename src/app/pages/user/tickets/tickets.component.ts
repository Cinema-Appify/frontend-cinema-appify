import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { SeatMovieTheatherComponent } from "../../../components/seat-movie-theather/seat-movie-theather.component";
import { GeneralButtonComponent } from "../../../components/general-button/general-button.component";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowUturnLeftSolid } from '@ng-icons/heroicons/solid';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-tickets',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SeatMovieTheatherComponent, GeneralButtonComponent, NgIconComponent, RouterLink],
  viewProviders: [provideIcons({ heroArrowUturnLeftSolid })],
  templateUrl: './tickets.component.html',
})
export class TicketsComponent {
  router = inject(Router)

  seatsSelected: Array<string> = [];

  rowA = [
    { seatNumber: 1, seatState: 'available' },
    { seatNumber: 2, seatState: 'available' },
    { seatNumber: 3, seatState: 'available' },
    { seatNumber: 4, seatState: 'available' },
    { seatNumber: 5, seatState: 'available' },
    { seatNumber: 6, seatState: 'available' },
    { seatNumber: 7, seatState: 'available' },
    { seatNumber: 8, seatState: 'reserved' },
    { seatNumber: 9, seatState: 'available' },
    { seatNumber: 10, seatState: 'available' },
    { seatNumber: 11, seatState: 'reserved' },
    { seatNumber: 12, seatState: 'reserved' },
  ];

  rowB = [
    { seatNumber: 1, seatState: 'available' },
    { seatNumber: 2, seatState: 'available' },
    { seatNumber: 3, seatState: 'available' },
    { seatNumber: 4, seatState: 'available' },
    { seatNumber: 5, seatState: 'available' },
    { seatNumber: 6, seatState: 'available' },
    { seatNumber: 7, seatState: 'available' },
    { seatNumber: 8, seatState: 'available' },
    { seatNumber: 9, seatState: 'available' },
    { seatNumber: 10, seatState: 'available' },
    { seatNumber: 11, seatState: 'available' },
    { seatNumber: 12, seatState: 'available' },
  ];

  rowC = [
    { seatNumber: 1, seatState: 'available' },
    { seatNumber: 2, seatState: 'available' },
    { seatNumber: 3, seatState: 'available' },
    { seatNumber: 4, seatState: 'available' },
    { seatNumber: 5, seatState: 'available' },
    { seatNumber: 6, seatState: 'available' },
    { seatNumber: 7, seatState: 'available' },
    { seatNumber: 8, seatState: 'available' },
    { seatNumber: 9, seatState: 'available' },
    { seatNumber: 10, seatState: 'available' },
    { seatNumber: 11, seatState: 'available' },
    { seatNumber: 12, seatState: 'available' },
    { seatNumber: 13, seatState: 'available' },
    { seatNumber: 14, seatState: 'available' },
    { seatNumber: 15, seatState: 'available' },
    { seatNumber: 16, seatState: 'available' },
    { seatNumber: 17, seatState: 'available' },
    { seatNumber: 18, seatState: 'available' },
  ];

  rowD = [
    { seatNumber: 1, seatState: 'available' },
    { seatNumber: 2, seatState: 'available' },
    { seatNumber: 3, seatState: 'available' },
    { seatNumber: 4, seatState: 'available' },
    { seatNumber: 5, seatState: 'available' },
    { seatNumber: 6, seatState: 'available' },
    { seatNumber: 7, seatState: 'available' },
    { seatNumber: 8, seatState: 'available' },
    { seatNumber: 9, seatState: 'available' },
    { seatNumber: 10, seatState: 'available' },
    { seatNumber: 11, seatState: 'available' },
    { seatNumber: 12, seatState: 'available' },
    { seatNumber: 13, seatState: 'available' },
    { seatNumber: 14, seatState: 'available' },
    { seatNumber: 15, seatState: 'available' },
    { seatNumber: 16, seatState: 'available' },
    { seatNumber: 17, seatState: 'available' },
    { seatNumber: 18, seatState: 'available' },
  ];

  rowE = [
    { seatNumber: 1, seatState: 'available' },
    { seatNumber: 2, seatState: 'available' },
    { seatNumber: 3, seatState: 'available' },
    { seatNumber: 4, seatState: 'available' },
    { seatNumber: 5, seatState: 'available' },
    { seatNumber: 6, seatState: 'available' },
    { seatNumber: 7, seatState: 'available' },
    { seatNumber: 8, seatState: 'available' },
    { seatNumber: 9, seatState: 'available' },
    { seatNumber: 10, seatState: 'available' },
    { seatNumber: 11, seatState: 'available' },
    { seatNumber: 12, seatState: 'available' },
    { seatNumber: 13, seatState: 'available' },
    { seatNumber: 14, seatState: 'available' },
    { seatNumber: 15, seatState: 'available' },
    { seatNumber: 16, seatState: 'available' },
    { seatNumber: 17, seatState: 'available' },
    { seatNumber: 18, seatState: 'available' },
  ]

  rowF = [
    { seatNumber: 1, seatState: 'available' },
    { seatNumber: 2, seatState: 'available' },
    { seatNumber: 3, seatState: 'available' },
    { seatNumber: 4, seatState: 'available' },
    { seatNumber: 5, seatState: 'available' },
    { seatNumber: 6, seatState: 'available' },
    { seatNumber: 7, seatState: 'available' },
    { seatNumber: 8, seatState: 'available' },
    { seatNumber: 9, seatState: 'available' },
    { seatNumber: 10, seatState: 'available' },
    { seatNumber: 11, seatState: 'available' },
    { seatNumber: 12, seatState: 'available' },
    { seatNumber: 13, seatState: 'available' },
    { seatNumber: 14, seatState: 'available' },
    { seatNumber: 15, seatState: 'available' },
    { seatNumber: 16, seatState: 'available' },
    { seatNumber: 17, seatState: 'available' },
    { seatNumber: 18, seatState: 'available' },
    { seatNumber: 19, seatState: 'available' },
    { seatNumber: 20, seatState: 'availables' },
  ]

  handleSelectedSeats(id: string, state: string) {
    if (state === 'reserved') {
      return;
    } else {
      if (this.seatsSelected.includes(id)) {
        this.seatsSelected = this.seatsSelected.filter(seat => seat !== id);
      } else {
        this.seatsSelected.push(id);
      }
    }
  }

  handleBuyTickets() {
    console.log(this.seatsSelected);
    console.log('Tickets bought');
    //this.router.navigate(['/user/payment']);
  }
}
