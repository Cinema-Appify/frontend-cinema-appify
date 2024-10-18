import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-form',
  standalone: true,
  imports: [],
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.css'
})
export class GeneralFormComponent {

  @Input() fields: {name: string, type: string, placeHolder: string }[] = [];
  

}
