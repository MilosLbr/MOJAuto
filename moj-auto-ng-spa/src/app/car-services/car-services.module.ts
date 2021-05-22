import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CarServicesComponent } from './car-services.component';
import { CarServicesRoutingModule } from './car-services.routing';
import { CarServicesEffects } from './store/car-services.effects';
import { carServicesReducer } from './store/car-services.reducer';
import { carServicesStoreName } from './store/car-services.store';

@NgModule({
    imports: [
        CarServicesRoutingModule,
        CommonModule,
        StoreModule.forFeature(carServicesStoreName, carServicesReducer),
        EffectsModule.forFeature([CarServicesEffects]),
    ],
    declarations: [CarServicesComponent],
})
export class CarServicesModule {}
