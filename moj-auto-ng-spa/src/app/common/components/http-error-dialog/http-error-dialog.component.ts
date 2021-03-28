import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-http-error-dialog',
    templateUrl: './http-error-dialog.component.html',
    styleUrls: ['./http-error-dialog.component.scss'],
})
export class HttpErrorDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public errorMessage: string) {}

    ngOnInit(): void {}
}
