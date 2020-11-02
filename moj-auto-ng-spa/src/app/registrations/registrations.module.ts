import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegistrationsComponent } from './registrations.component';
import { RegistrationsRoutingModule } from './registrations.routing';

@NgModule({
  imports: [
    RegistrationsRoutingModule,
    CommonModule
  ],
  declarations: [RegistrationsComponent],
})
export class RegistrationsModule {}
