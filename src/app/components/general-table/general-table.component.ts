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

  @Input() columns: { title: string; key: string; action?: boolean}[] = [];
  @Input() data: any[] = [];
  @Input() actions: boolean = true;
  @Input() editAction: (id: number) => void = () => {};
  @Input() deleteAction: (id: number) => void = () => {};
  @Input() viewAction?: (item: any) => void = () => {};

  getRoleNames(roles: any[]): string {
    return roles.map(role => role.name).join(', '); // Une los nombres de los roles, en caso de 
                                                    //existir mas de un rol asignado en el array
  }

  handleView(item: any): void {
    if (this.viewAction) {
      this.viewAction(item);
    } else {
      console.error('viewAction no está definido');
    }
  }
}
