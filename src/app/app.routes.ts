import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SignUpUserComponent } from './pages/sign-up-user/sign-up-user.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { CinemasComponent } from './pages/cinemas/cinemas.component';
import { BillboardsComponent } from './pages/billboards/billboards.component';
import { UpcomingReleasesComponent } from './pages/upcoming-releases/upcoming-releases.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Sign In',
        component: SignInComponent,
    },
    {
        path: 'forgot-password',
        title: 'Forgot Password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'sign-up-user',
        title: 'Sign Up',
        component: SignUpUserComponent,
    },
    {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
    },
    {
        path: 'users',
        title: 'Users',
        component: UsersComponent,
    },
    {
        path: 'cinemas',
        title: 'Cinemas',
        component: CinemasComponent,
    },
    {
        path: 'billboards',
        title: 'Billboards',
        component: BillboardsComponent,
    },
    {
        path: 'upcoming-releases',
        title: 'Upcoming Releases',
        component: UpcomingReleasesComponent,
    },
    {
        path: 'movies',
        title: 'Movies',
        component: MoviesComponent,
    },
    {
        path: 'rooms',
        title: 'Rooms',
        component: RoomsComponent,
    },
    {
        path: 'user-profile',
        title: 'Profile',
        component: UserProfileComponent,
    },
    // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
