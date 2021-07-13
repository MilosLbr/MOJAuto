import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { YesNoDialogComponent } from 'src/app/common/components/yes-no-dialog/yes-no-dialog.component';
import { UserCar } from 'src/app/common/models/UserCar';
import { IHomeState } from '../store/home.store';
import { CreateEditCarComponent } from './create-edit-car/create-edit-car.component';
import { CreateEditCarModel } from './create-edit-car/create-edit-car.model';
import { addNewCar, deleteCar, editCar, fetchAllCars } from './store/cars.actions';
import { getAllCars } from './store/cars.selectors';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    myCars$: Observable<UserCar[]>;

    constructor(private store: Store<IHomeState>, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.store.dispatch(fetchAllCars());
        this.myCars$ = this.store.select(getAllCars);
    }

    onCreateOrEditCarClicked(carData: CreateEditCarModel): void {
        const dialogData: CreateEditCarModel =
            carData != null
                ? {
                      ...carData,
                  }
                : null;

        const dialogRef = this.dialog.open<CreateEditCarComponent, CreateEditCarModel, CreateEditCarModel>(
            CreateEditCarComponent,
            {
                width: '50%',
                data: dialogData,
                disableClose: true,
            }
        );

        dialogRef.afterClosed().subscribe((createEditData: CreateEditCarModel) => {
            if (createEditData == null) {
                return;
            }

            if (createEditData.id == null) {
                this.store.dispatch(addNewCar({ carData: createEditData }));
            } else {
                this.store.dispatch(editCar({ carData: createEditData }));
            }
        });
    }

    onDeleteCarClicked(car: UserCar): void {
        const dialogRef = this.dialog.open(YesNoDialogComponent, {
            data: 'Da li ste sigurni da želite da obrišete ovaj automobil i sve informacije o njemu?',
        });

        dialogRef.afterClosed().subscribe((result: Boolean) => {
            if (result) {
                this.store.dispatch(deleteCar({ carId: car.id }));
            }
        });
    }
}
