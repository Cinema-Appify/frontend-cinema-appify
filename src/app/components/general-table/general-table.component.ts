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
  @Input() deleteAction: (movieName: any) => void = () => {};
  @Input() editAction: (movie: any) => void = () => {};




  getRoleNames(roles: any[]): string {
    return roles.map(role => role.name).join(', '); // Une los nombres de los roles, en caso de 
                                                    //existir mas de un rol asignado en el array
  }
}
