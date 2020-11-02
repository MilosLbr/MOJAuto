import { NgModule } from '@angular/core';
import { CarServicesComponent } from './car-services.component';
import { CarServicesRoutingModule } from './car-services.routing';

@NgModule({
    imports: [
        CarServicesRoutingModule
    ],
    declarations: [
        CarServicesComponent
    ]
})
export class CarServicesModule {

}