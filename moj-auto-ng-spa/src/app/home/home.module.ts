import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './store/home.reducer';
import { homeStoreName } from './store/home.store';
import { EffectsModule } from '@ngrx/effects';
import { homeEffects } from './store/home.effects';
import { MaterialModule } from '../common/modules/material.module';
import { CreateEditCarComponent } from './dashboard/create-edit-car/create-edit-car.component';

@NgModule({
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        CommonModule,
        MatListModule,
        RouterModule,
        StoreModule.forFeature(homeStoreName, homeReducer),
        EffectsModule.forFeature(homeEffects),
    ],
    declarations: [HomeComponent, LoginComponent, RegisterComponent, DashboardComponent, CreateEditCarComponent],
    exports: [HomeComponent],
})
export class HomeModule {}
