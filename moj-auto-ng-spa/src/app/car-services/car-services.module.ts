import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../common/modules/material.module';
import { CarServicesComponent } from './car-services.component';
import { CarServicesRoutingModule } from './car-services.routing';
import { CarServicesEffects } from './store/car-services.effects';
import { carServicesReducer } from './store/car-services.reducer';
import { carServicesStoreName } from './store/car-services.store';
import { CreateEditCarServiceComponent } from './create-edit-car-service/create-edit-car-service.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CarServicesRoutingModule,
        CommonModule,
        StoreModule.forFeature(carServicesStoreName, carServicesReducer),
        EffectsModule.forFeature([CarServicesEffects]),
        MaterialModule,
    ],
    declarations: [CarServicesComponent, CreateEditCarServiceComponent],
})
export class CarServicesModule {}
