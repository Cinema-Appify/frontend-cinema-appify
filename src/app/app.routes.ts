import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SignUpUserComponent } from './pages/sign-up-user/sign-up-user.component';

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
    }
    // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
