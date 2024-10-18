import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SignUpUserComponent } from './pages/sign-up-user/sign-up-user.component';
import { SignUpCinemaComponent } from './pages/sign-up-cinema/sign-up-cinema.component';
import { RegisterCinemaComponent } from './pages/register-cinema/register-cinema.component';
import { GeneralFormComponent } from './components/general-form/general-form.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

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
        component: RegisterCinemaComponent
    },
    {
        path: 'register-user',
        title: 'Register User',
        component: RegisterUserComponent
    }
  
    
   
    // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
