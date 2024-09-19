import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-button.component.html',
  styleUrl: './general-button.component.css'
})
export class GeneralButtonComponent {
  @Input() text: string;
  @Input() color: string;
  @Input() colorHover: string;
  @Input() width: number;

  constructor() {
    this.text = '';
    this.color = '';
    this.colorHover = '';
    this.width = 28;
  }
}
