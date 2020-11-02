import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarServicesComponent } from './car-services.component';
import { CarServicesRoutingModule } from './car-services.routing';

@NgModule({
    imports: [
        CarServicesRoutingModule,
        CommonModule
    ],
    declarations: [
        CarServicesComponent
    ]
})
export class CarServicesModule {

}