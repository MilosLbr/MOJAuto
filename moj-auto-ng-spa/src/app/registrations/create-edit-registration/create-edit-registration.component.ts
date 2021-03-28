import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistrationInfo } from 'src/app/common/models/RegistrationInfo';

@Component({
    selector: 'app-create-edit-registration',
    templateUrl: './create-edit-registration.component.html',
    styleUrls: ['./create-edit-registration.component.scss'],
})
export class CreateEditRegistrationComponent implements OnInit {
    dateControl: FormControl;
    techServiceNameControl: FormControl;
    kilometrageControl: FormControl;
    totalPriceControl: FormControl;
    additionalCommentControl: FormControl;
    formData: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<CreateEditRegistrationComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: RegistrationInfo,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initForm(this.dialogData);
    }

    onSaveChanges() {
        const registrationInfo = this.formData.value as RegistrationInfo;
        console.log(registrationInfo);
        this.dialogRef.close();
    }

    onCancel() {
        this.dialogRef.close();
    }

    private initForm(dialogData: RegistrationInfo = null): void {
        this.techServiceNameControl = this.fb.control(dialogData?.technicalCheckService, Validators.required);
        this.totalPriceControl = this.fb.control(dialogData?.totalPrice, [Validators.required, Validators.min(1)]);
        this.kilometrageControl = this.fb.control(dialogData?.kilometrage, [Validators.required, Validators.min(1)]);
        this.dateControl = this.fb.control(dialogData?.dateOfRegistration, Validators.required);
        this.additionalCommentControl = this.fb.control(dialogData?.additionalComment);

        this.formData = this.fb.group({
            technicalCheckService: this.techServiceNameControl,
            totalPrice: this.totalPriceControl,
            kilometrage: this.kilometrageControl,
            dateOfRegistration: this.dateControl,
            additionalComment: this.additionalCommentControl,
        });
    }
}
