import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'registracije',
        loadChildren: () => import('./registrations/registrations.module').then((m) => m.RegistrationsModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'servisi',
        loadChildren: () => import('./car-services/car-services.module').then((m) => m.CarServicesModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'gorivo',
        loadChildren: () => import('./fuel-consumption/fuel-usage.module').then((m) => m.FuelUsageModule),
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
