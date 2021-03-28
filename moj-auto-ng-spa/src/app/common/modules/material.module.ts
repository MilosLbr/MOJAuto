import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

@NgModule({
    exports: [
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
})
export class MaterialModule {}
