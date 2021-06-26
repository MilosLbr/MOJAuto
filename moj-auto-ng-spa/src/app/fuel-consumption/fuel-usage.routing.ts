import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FuelUsageComponent } from './fuel-usage.component';

const routes: Route[] = [
    {
        path: '',
        component: FuelUsageComponent,
    },
    {
        path: ':id/:carModel',
        component: FuelUsageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FuelUsageRoutingModule {}
