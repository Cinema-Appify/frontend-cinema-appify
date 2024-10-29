import { Routes } from '@angular/router';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { RegisterCinemaComponent } from './pages/admin/register-cinema/register-cinema.component';
import { HomeComponent } from './pages/home/home.component';
import { CinemasComponent } from './pages/admin/cinemas/cinemas.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SignUpUserComponent } from './pages/auth/sign-up-user/sign-up-user.component';
import { SignUpCinemaComponent } from './pages/auth/sign-up-cinema/sign-up-cinema.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { BillboardsComponent } from './pages/user/billboards/billboards.component';
import { UpcomingReleasesComponent } from './pages/user/upcoming-releases/upcoming-releases.component';
import { MoviesComponent } from './pages/cinema/movies/movies.component';
import { RoomsComponent } from './pages/cinema/rooms/rooms.component';
import { RegisterUserComponent } from './pages/admin/register-user/register-user.component';

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
        path: 'sign-up-cinema',
        title: 'Sign Up Cinema',
        component: SignUpCinemaComponent,
    },
    {
        path: 'register-cinema',
        title: 'Register Cinema',
        component: RegisterCinemaComponent,
    },
    {
        path: 'register-user',
        title: 'Register User',
        component: RegisterUserComponent
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
