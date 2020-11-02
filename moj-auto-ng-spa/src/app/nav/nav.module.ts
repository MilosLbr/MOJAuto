import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavComponent } from './nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        RouterModule 
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