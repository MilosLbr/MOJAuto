import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'registracije',
    loadChildren: () => import('./registrations/registrations.module').then(m => m.RegistrationsModule)
  },
  {
    path: 'servisi',
    loadChildren: () => import('./car-services/car-services.module').then(m => m.CarServicesModule)
  },
  {
    path: 'gorivo',
    loadChildren: () => import('./fuel-consumption/fuel-consumption.module').then(m => m.FuelConsumptionModule)
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
