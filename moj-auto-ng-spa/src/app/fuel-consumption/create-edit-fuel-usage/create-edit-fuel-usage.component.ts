import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuelUsage } from 'src/app/common/models/FuelUsage';
import { UserCar } from 'src/app/common/models/UserCar';
import { CreateEditFuelUsageModel } from './create-edit-fuel-usage.model';

@Component({
    selector: 'app-create-edit-fuel-usage',
    templateUrl: './create-edit-fuel-usage.component.html',
    styleUrls: ['./create-edit-fuel-usage.component.scss'],
})
export class CreateEditFuelUsageComponent implements OnInit {
    gasStationNameControl: FormControl;
    litersFilledControl: FormControl;
    priceControl: FormControl;
    dateControl: FormControl;
    carFormControl: FormControl;
    formData: FormGroup;

    fuelUsageData: FuelUsage;
    myCars: UserCar[] = [];

    constructor(
        private dialogRef: MatDialogRef<CreateEditFuelUsageComponent, FuelUsage>,
        @Inject(MAT_DIALOG_DATA) private dialogData: CreateEditFuelUsageModel,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.fuelUsageData = { ...this.dialogData?.fuelUsage };
        this.myCars = [...this.dialogData.myCars];

        this.initializeForm(this.fuelUsageData);
    }

    displayCarName(car: UserCar): string {
        return car && car.model ? car.model : '';
    }

    onSaveChanges() {
        const fuelUsage: FuelUsage = {
            ...this.dialogData.fuelUsage,
            ...this.formData.value,
            car: this.carFormControl.value,
            carId: this.carFormControl.value.id,
        };
        this.dialogRef.close(fuelUsage);
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    private initializeForm(fuelUsageData: FuelUsage) {
        this.gasStationNameControl = this.fb.control(fuelUsageData?.gasStationName, Validators.required);
        this.litersFilledControl = this.fb.control(fuelUsageData?.litersFilled, [
            Validators.required,
            Validators.min(1),
        ]);
        this.priceControl = this.fb.control(fuelUsageData?.price, [Validators.required, Validators.min(1)]);
        this.dateControl = this.fb.control(fuelUsageData?.dateFilled, Validators.required);
        this.carFormControl = this.fb.control(fuelUsageData?.car, Validators.required);

        this.formData = this.fb.group({
            gasStationName: this.gasStationNameControl,
            litersFilled: this.litersFilledControl,
            price: this.priceControl,
            dateFilled: this.dateControl,
            carId: this.carFormControl,
        });
    }
}
