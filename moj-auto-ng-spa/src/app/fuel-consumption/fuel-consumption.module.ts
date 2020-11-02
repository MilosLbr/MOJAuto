import { NgModule } from '@angular/core';
import { FuelConsumptionComponent } from './fuel-consumption.component';
import { FuelConsumptionRoutingModule } from './fuel-consumption.routing';

@NgModule({
    imports: [
        FuelConsumptionRoutingModule
    ],
    declarations: [
        FuelConsumptionComponent
    ]
})
export class FuelConsumptionModule {

}