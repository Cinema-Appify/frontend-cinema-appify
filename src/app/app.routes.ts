import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

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
        path: 'sign-up',
        title: 'Sign Up',
        component: SignUpComponent,
    }
    // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
