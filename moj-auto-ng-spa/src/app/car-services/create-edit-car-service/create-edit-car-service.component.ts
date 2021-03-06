import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceDto } from 'src/app/common/models/ServiceDto';
import { UserCar } from 'src/app/common/models/UserCar';
import { CreateEditCarServiceModel } from './create-edit-car-service.model';

@Component({
    selector: 'app-create-edit-car-service',
    templateUrl: './create-edit-car-service.component.html',
    styleUrls: ['./create-edit-car-service.component.scss'],
})
export class CreateEditCarServiceComponent implements OnInit {
    formData: FormGroup;
    titleControl: FormControl;
    carFormControl: FormControl;
    totalPriceControl: FormControl;
    kilometrageControl: FormControl;
    dateControl: FormControl;
    additionalCommentControl: FormControl;

    myCars: UserCar[];
    carServiceInfo: ServiceDto;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CreateEditCarServiceComponent, ServiceDto>,
        @Inject(MAT_DIALOG_DATA)
        public dialogData: CreateEditCarServiceModel
    ) {}

    ngOnInit(): void {
        this.myCars = this.dialogData.myCars;
        this.carServiceInfo = this.dialogData.carServiceInfo;
        this.initForm(this.carServiceInfo);
    }

    onSaveChanges(): void {
        const serviceInfo: ServiceDto = {
            ...this.carServiceInfo,
            ...this.formData.value,
            car: this.carFormControl.value,
            carId: this.carFormControl.value.id,
        };
        this.dialogRef.close(serviceInfo);
    }

    onCancel(): void {
        this.dialogRef.close(null);
    }

    initForm(carService: ServiceDto): void {
        this.titleControl = this.fb.control(carService?.title, Validators.required);
        this.carFormControl = this.fb.control(carService?.car, Validators.required);
        this.totalPriceControl = this.fb.control(carService?.price, [Validators.required, Validators.min(1)]);
        this.kilometrageControl = this.fb.control(carService?.kilometrage, [Validators.required, Validators.min(1)]);
        this.dateControl = this.fb.control(carService?.dateOfService, Validators.required);
        this.additionalCommentControl = this.fb.control(carService?.comment, Validators.required);

        this.formData = this.fb.group({
            title: this.titleControl,
            car: this.carFormControl,
            price: this.totalPriceControl,
            kilometrage: this.kilometrageControl,
            dateOfService: this.dateControl,
            comment: this.additionalCommentControl,
        });
    }

    displayCarName(car: UserCar): string {
        return car && car.model ? car.model : '';
    }
}
