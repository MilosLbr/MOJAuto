import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RegistrationsComponent } from './registrations.component';
import { RegistrationsRoutingModule } from './registrations.routing';
import { RegistrationEffects } from './store/registrations.effects';
import { registrationsReducer } from './store/registrations.reducer';
import { registrationsStoreName } from './store/registrations.store';
import { CreateEditRegistrationComponent } from './create-edit-registration/create-edit-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../common/modules/material.module';

@NgModule({
    imports: [
        RegistrationsRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        StoreModule.forFeature(registrationsStoreName, registrationsReducer),
        EffectsModule.forFeature([RegistrationEffects]),
        MaterialModule,
    ],
    declarations: [RegistrationsComponent, CreateEditRegistrationComponent],
})
export class RegistrationsModule {}
