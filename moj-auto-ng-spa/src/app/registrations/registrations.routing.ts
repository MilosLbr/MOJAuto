import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RegistrationsComponent } from './registrations.component';

const routes: Route[] = [
    {
        path: '',
        component: RegistrationsComponent,
    },
    {
        path: ':id/:carModel',
        component: RegistrationsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegistrationsRoutingModule {}
