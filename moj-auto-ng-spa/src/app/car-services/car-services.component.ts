import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { YesNoDialogComponent } from '../common/components/yes-no-dialog/yes-no-dialog.component';
import { ServiceDto } from '../common/models/ServiceDto';
import { CarsService } from '../home/dashboard/services/cars.service';
import { CreateEditCarServiceComponent } from './create-edit-car-service/create-edit-car-service.component';
import { CreateEditCarServiceModel } from './create-edit-car-service/create-edit-car-service.model';
import {
    createNewCarServiceEntry,
    deleteCarServiceEntry,
    getCarServicesForCar,
    getCarServicesForUser,
    updateCarServiceEntry,
} from './store/car-services.actions';
import { carServices } from './store/car-services.selectors';

@Component({
    selector: 'app-car-services',
    templateUrl: './car-services.component.html',
    styleUrls: ['./car-services.component.scss'],
})
export class CarServicesComponent implements OnInit {
    carId: number;
    carModel: string;
    carServicesData$: Observable<ServiceDto[]>;
    columnsToDisplay: string[] = ['title', 'price', 'kilometrage', 'dateOfService', 'car', 'comment', 'actions'];
    myCars: any;

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private dialog: MatDialog,
        private carService: CarsService
    ) {}

    ngOnInit(): void {
        this.carId = this.route.snapshot.params['id'];
        this.carModel = this.route.snapshot.params['carModel'];

        if (this.carId == null) {
            this.store.dispatch(getCarServicesForUser());
        } else {
            this.store.dispatch(getCarServicesForCar({ carId: this.carId }));
        }

        this.carServicesData$ = this.store.select(carServices);

        this.myCars = this.carService.getMyCarsFromStore(this.carId);
    }

    openCreateOrEditDialog(carService: ServiceDto): void {
        const dialogData: CreateEditCarServiceModel = {
            myCars: this.myCars,
            carServiceInfo: carService,
        };

        const dialogRef = this.dialog.open(CreateEditCarServiceComponent, {
            data: dialogData,
            disableClose: true,
            width: '50%',
        });

        dialogRef.afterClosed().subscribe((carService: ServiceDto) => {
            if (carService == null) {
                return;
            }

            if (carService.id == null) {
                this.store.dispatch(createNewCarServiceEntry({ carService }));
            } else {
                this.store.dispatch(updateCarServiceEntry({ carService }));
            }
        });
    }

    deleteCarServiceEntry(carService: ServiceDto): void {
        const dialogRef = this.dialog.open(YesNoDialogComponent, {
            data: 'Da li ste sigurni da želite da obrišete ovaj unos o obavljenom servisu?',
        });

        dialogRef.afterClosed().subscribe((result: Boolean) => {
            if (result) {
                this.store.dispatch(deleteCarServiceEntry({ serviceId: carService.id }));
            }
        });
    }
}
