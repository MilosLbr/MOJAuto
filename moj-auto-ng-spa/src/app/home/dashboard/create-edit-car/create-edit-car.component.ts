import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateEditCarModel } from './create-edit-car.model';

@Component({
    selector: 'app-create-edit-car',
    templateUrl: './create-edit-car.component.html',
    styleUrls: ['./create-edit-car.component.scss'],
})
export class CreateEditCarComponent implements OnInit {
    modelNameControl: FormControl;
    kilometrageControl: FormControl;
    manufactureYearControl: FormControl;
    engineCubicCapacityControl: FormControl;
    enginePowerControl: FormControl;
    formData: FormGroup;

    carData: CreateEditCarModel;

    constructor(
        private dialogRef: MatDialogRef<CreateEditCarComponent, CreateEditCarModel>,
        @Inject(MAT_DIALOG_DATA) private dialogData: CreateEditCarModel,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.carData = this.dialogData;

        this.initializeForm(this.carData);
    }

    initializeForm(carData: CreateEditCarModel) {
        this.modelNameControl = this.fb.control(carData?.model, Validators.required);
        this.kilometrageControl = this.fb.control(carData?.kilometrage, [Validators.required, Validators.min(0)]);
        this.manufactureYearControl = this.fb.control(carData?.manufactureYear, [
            Validators.required,
            Validators.min(1900),
        ]);
        this.engineCubicCapacityControl = this.fb.control(carData?.engineCubicCapacity, [
            Validators.required,
            Validators.min(1000),
        ]);
        this.enginePowerControl = this.fb.control(carData?.enginePowerKW, [Validators.required, Validators.min(1)]);

        this.formData = this.fb.group({
            model: this.modelNameControl,
            kilometrage: this.kilometrageControl,
            manufactureYear: this.manufactureYearControl,
            engineCubicCapacity: this.engineCubicCapacityControl,
            enginePowerKW: this.enginePowerControl,
        });
    }

    onSaveChanges(): void {
        const dataForSaving: CreateEditCarModel = {
            ...this.carData,
            ...this.formData.value,
        };

        this.dialogRef.close(dataForSaving);
    }

    onCancel(): void {
        this.dialogRef.close(null);
    }
}
