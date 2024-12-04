import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { SearchInputComponent } from '../../../components/search-input/search-input.component';
import { GeneralSelectComponent } from '../../../components/general-select/general-select.component';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { ChatbotComponent } from '../../../components/chatbot/chatbot.component';


@Component({
  selector: 'app-upcoming-releases',
  standalone: true,
  imports: [NavbarComponent, SearchInputComponent, GeneralSelectComponent, MovieCardComponent, ChatbotComponent],
  templateUrl: './upcoming-releases.component.html',
})
export class UpcomingReleasesComponent {

}
