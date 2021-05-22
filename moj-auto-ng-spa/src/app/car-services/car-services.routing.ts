import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CarServicesComponent } from './car-services.component';

const routes: Route[] = [
    {
        path: '',
        component: CarServicesComponent,
    },
    {
        path: ':id/:carModel',
        component: CarServicesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CarServicesRoutingModule {}
