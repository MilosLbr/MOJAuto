import { NgModule } from "@angular/core";
import { HomeComponent } from './home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    imports: [
        MatTabsModule
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
