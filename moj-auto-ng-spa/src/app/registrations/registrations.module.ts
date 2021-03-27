import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RegistrationsComponent } from './registrations.component';
import { RegistrationsRoutingModule } from './registrations.routing';
import { RegistrationEffects } from './store/registrations.effects';
import { registrationsReducer } from './store/registrations.reducer';
import { registrationsStoreName } from './store/registrations.store';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    RegistrationsRoutingModule,
    CommonModule,
    StoreModule.forFeature(registrationsStoreName, registrationsReducer),
    EffectsModule.forFeature([RegistrationEffects]),
    MatTableModule,
  ],
  declarations: [RegistrationsComponent],
})
export class RegistrationsModule {}
