import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../common/modules/material.module';
import { FuelUsageComponent } from './fuel-usage.component';
import { FuelUsageRoutingModule } from './fuel-usage.routing';
import { FuelUsageEffects } from './store/fuel-usage.effects';
import { fuelUsageReducer } from './store/fuel-usage.reducer';
import { fuelUsageStoreName } from './store/fuel-usage.store';

@NgModule({
    imports: [
        FuelUsageRoutingModule,
        CommonModule,
        MaterialModule,
        StoreModule.forFeature(fuelUsageStoreName, fuelUsageReducer),
        EffectsModule.forFeature([FuelUsageEffects]),
    ],
    declarations: [FuelUsageComponent],
})
export class FuelUsageModule {}
