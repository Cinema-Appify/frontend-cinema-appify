import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seat-movie-theather',
  standalone: true,
  imports: [],
  templateUrl: './seat-movie-theather.component.html',
})
export class SeatMovieTheatherComponent {
  @Input() seatIdentifier: string;
  @Input() seatNumber: number;
  @Input() seatState: string;
  @Input() rowName: string;
  @Input() selectedSeats: Function;
  color: string;

  constructor() {
    this.seatIdentifier = '';
    this.seatNumber = 0;
    this.seatState = '';
    this.rowName = '';
    this.color = this.colorSeat();
    this.selectedSeats = () => { };
  }

  ngOnInit() {
    this.color = this.colorSeat();
  }

  colorSeat() {
    if (this.seatState === 'reserved') {
      return 'fill-strong-red';
    } else if (this.seatState === 'selected') {
      return 'fill-golden';
    } else { // available
      return 'fill-grayish-blue';
    }
  }

  handleChangeSeatState() {
    if (this.seatState === 'reserved') {
      return;
    }
    if (this.seatState === 'selected') {
      this.seatState = '';
    } else {
      this.seatState = 'selected';
    }
    this.color = this.colorSeat();
  }
}
