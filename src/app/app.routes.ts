import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Projects } from './features/projects/projects';
import { Contact } from './features/contact/contact';
import { Cumple } from './features/cumple/cumple';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'projects', component: Projects },
    { path: 'contact', component: Contact },
    { path: 'cumple', component: Cumple },
    { path: '**', redirectTo: '' }
];
