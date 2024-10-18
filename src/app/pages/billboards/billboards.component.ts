import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { GeneralSelectComponent } from "../../components/general-select/general-select.component";

@Component({
  selector: 'app-billboards',
  standalone: true,
  imports: [NavbarComponent, MovieCardComponent, SearchInputComponent, GeneralSelectComponent],
  templateUrl: './billboards.component.html',
})
export class BillboardsComponent {

}
