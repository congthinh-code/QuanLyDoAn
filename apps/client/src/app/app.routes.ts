import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { ProfileComponent } from './components/profile/profile';
import { TopicListComponent } from './components/topic-list/topic-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'topics', component: TopicListComponent },
];