import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatListModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
