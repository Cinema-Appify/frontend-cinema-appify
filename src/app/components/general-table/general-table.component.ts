import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-table.component.html',
  styleUrl: './general-table.component.css'
})
export class GeneralTableComponent {

  @Input() columns: { title: string; key: string}[] = [];
  @Input() data: any[] = [];
  @Input() actions: boolean = true;
  @Input() editAction: (id: number) => void = () => {};
  @Input() deleteAction: (id: number) => void = () => {};

  
}
