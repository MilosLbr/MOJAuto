import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { YesNoDialogComponent } from '../common/components/yes-no-dialog/yes-no-dialog.component';
import { FuelUsage } from '../common/models/FuelUsage';
import { UserCar } from '../common/models/UserCar';
import { CarsService } from '../home/dashboard/services/cars.service';
import { CreateEditFuelUsageComponent } from './create-edit-fuel-usage/create-edit-fuel-usage.component';
import { CreateEditFuelUsageModel } from './create-edit-fuel-usage/create-edit-fuel-usage.model';
import { FuelUsageService } from './services/fuel-usage.service';
import {
    createNewFuelUsageEntry,
    deleteFuelUsageEntry,
    getAllFuelUsagesForUser,
    getFuelUsagesForCar,
    updateFuelUsageEntry,
} from './store/fuel-usage.actions';
import { getFuelUsages } from './store/fuel-usage.selectors';

@Component({
    selector: 'app-fuel-consumption',
    templateUrl: './fuel-usage.component.html',
    styleUrls: ['./fuel-usage.component.scss'],
})
export class FuelUsageComponent implements OnInit {
    carId: number;
    carModel: string;
    fuelUsageData$: Observable<FuelUsage[]>;
    columnsToDisplay = ['gasStationName', 'liters', 'price', 'dateFiled', 'car', 'kilometrage', 'actions'];
    myCars: UserCar[];

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private dialog: MatDialog,
        private carsService: CarsService
    ) {}

    ngOnInit(): void {
        this.carId = this.route.snapshot.params['id'];
        this.carModel = this.route.snapshot.params['carModel'];

        if (this.carId == null) {
            this.store.dispatch(getAllFuelUsagesForUser());
        } else {
            this.store.dispatch(getFuelUsagesForCar({ carId: this.carId }));
        }

        this.fuelUsageData$ = this.store.select(getFuelUsages);

        this.myCars = this.carsService.getMyCarsFromStore(this.carId);
    }

    openCreateOrEditDialog(fuelUsage: FuelUsage) {
        const dialogData: CreateEditFuelUsageModel = {
            fuelUsage: fuelUsage,
            myCars: this.myCars,
        };

        const dialogRef = this.dialog.open(CreateEditFuelUsageComponent, {
            width: '50%',
            data: dialogData,
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((fuelUsage: FuelUsage) => {
            if (fuelUsage == null) {
                return;
            }

            if (fuelUsage.id == null) {
                this.store.dispatch(createNewFuelUsageEntry({ fuelUsage }));
            } else {
                this.store.dispatch(updateFuelUsageEntry({ fuelUsage }));
            }
        });
    }

    deleteFuelUsageEntry(fuelUsage: FuelUsage) {
        const dialogRef = this.dialog.open(YesNoDialogComponent, {
            data: 'Da li ste sigurni da želite da obrišete ovaj unos?',
        });

        dialogRef.afterClosed().subscribe((result: Boolean) => {
            if (result) {
                this.store.dispatch(deleteFuelUsageEntry({ fuelUsage }));
            }
        });
    }
}
