import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat/chat').then((com) => com.Chat),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((com) => com.Login),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login').then((com) => com.Login),
  },
];
