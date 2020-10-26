import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavComponent } from './nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule
    ],
    declarations: [
        NavComponent
    ],
    exports: [
        NavComponent
    ]
})
export class NavModule{

}