import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { RegistrationInfo } from 'src/app/common/models/RegistrationInfo';
import { UserCar } from 'src/app/common/models/UserCar';
import { createRegistrationEntry, updateRegistrationEntry } from '../store/registrations.actions';
import { CreateEditRegistrationModel } from './create-edit-registration.model';

@Component({
    selector: 'app-create-edit-registration',
    templateUrl: './create-edit-registration.component.html',
    styleUrls: ['./create-edit-registration.component.scss'],
})
export class CreateEditRegistrationComponent implements OnInit, OnDestroy {
    dateControl: FormControl;
    techServiceNameControl: FormControl;
    carFormControl: FormControl;
    kilometrageControl: FormControl;
    totalPriceControl: FormControl;
    additionalCommentControl: FormControl;
    formData: FormGroup;
    registrationInfo: RegistrationInfo;
    myCars: UserCar[];
    private destroy$ = new Subject<void>();

    constructor(
        private dialogRef: MatDialogRef<CreateEditRegistrationComponent>,
        @Inject(MAT_DIALOG_DATA)
        public dialogData: CreateEditRegistrationModel,
        private fb: FormBuilder,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.myCars = this.dialogData.myCars;
        this.registrationInfo = this.dialogData.registrationInfo;
        this.initForm(this.registrationInfo);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    onSaveChanges() {
        const registrationInfo: RegistrationInfo = {
            ...this.dialogData.registrationInfo,
            ...this.formData.value,
            car: this.carFormControl.value,
            carId: this.carFormControl.value.id,
        };

        if (registrationInfo.id == null) {
            this.store.dispatch(createRegistrationEntry({ registration: registrationInfo }));
        } else {
            this.store.dispatch(updateRegistrationEntry({ registration: registrationInfo }));
        }
        this.dialogRef.close();
    }

    onCancel() {
        this.dialogRef.close();
    }

    displayCarName(car: UserCar): string {
        return car && car.model ? car.model : '';
    }

    private initForm(registrationInfo: RegistrationInfo = null): void {
        this.techServiceNameControl = this.fb.control(registrationInfo?.technicalCheckService, Validators.required);
        this.carFormControl = this.fb.control(registrationInfo?.car, Validators.required);
        this.totalPriceControl = this.fb.control(registrationInfo?.totalPrice, [
            Validators.required,
            Validators.min(1),
        ]);
        this.kilometrageControl = this.fb.control(registrationInfo?.kilometrage, [
            Validators.required,
            Validators.min(1),
        ]);
        this.dateControl = this.fb.control(registrationInfo?.dateOfRegistration, Validators.required);
        this.additionalCommentControl = this.fb.control(registrationInfo?.additionalComment);

        this.formData = this.fb.group({
            technicalCheckService: this.techServiceNameControl,
            carId: this.carFormControl,
            totalPrice: this.totalPriceControl,
            kilometrage: this.kilometrageControl,
            dateOfRegistration: this.dateControl,
            additionalComment: this.additionalCommentControl,
        });

        this.dateControl.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                map((val: Date) => {
                    const updated = new Date();
                    updated.setTime(val.getTime() + 6 * 60 * 60 * 1000); // add 6 hours to selected date
                    return updated;
                })
            )
            .subscribe((val: Date) => this.dateControl.setValue(val, { emitEvent: false }));
    }
}
