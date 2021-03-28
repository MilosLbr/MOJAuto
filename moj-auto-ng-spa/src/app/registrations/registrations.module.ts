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
import { MatDialogModule } from '@angular/material/dialog';
import { CreateEditRegistrationComponent } from './create-edit-registration/create-edit-registration.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

@NgModule({
    imports: [
        RegistrationsRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        StoreModule.forFeature(registrationsStoreName, registrationsReducer),
        EffectsModule.forFeature([RegistrationEffects]),
        MatTableModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRippleModule,
    ],
    declarations: [RegistrationsComponent, CreateEditRegistrationComponent],
})
export class RegistrationsModule {}
