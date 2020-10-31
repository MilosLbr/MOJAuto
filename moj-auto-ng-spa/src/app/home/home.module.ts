import { NgModule } from "@angular/core";
import { HomeComponent } from './home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        MatTabsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        CommonModule
    ],
    declarations: [
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    exports : [
        HomeComponent
    ]
})
export class HomeModule {

}
