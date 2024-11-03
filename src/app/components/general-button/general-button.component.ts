import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-button.component.html',
})
export class GeneralButtonComponent {
  @Input() text: string;
  @Input() color: string;
  @Input() colorHover: string;
  @Input() width: string;
  @Input() textColor: string;

  constructor() {
    this.text = '';
    this.color = '';
    this.colorHover = '';
    this.width = '';
    this.textColor = 'text-white';
  }
}
