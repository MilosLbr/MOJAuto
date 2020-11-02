import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FuelConsumptionComponent } from './fuel-consumption.component';

const routes: Route[] = [
    {
        path: "",
        component: FuelConsumptionComponent
    },
    {
        path: ":id",
        component: FuelConsumptionComponent
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class FuelConsumptionRoutingModule{

}