import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Sign In',
        component: SignInComponent,
    },
    // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
