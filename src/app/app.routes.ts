import { Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout.component').then(c => c.CheckoutComponent)
  },
  {path:'**', pathMatch:"full", redirectTo:''},
];
