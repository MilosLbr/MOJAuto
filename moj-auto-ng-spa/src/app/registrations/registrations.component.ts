import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { YesNoDialogComponent } from '../common/components/yes-no-dialog/yes-no-dialog.component';
import { RegistrationInfo } from '../common/models/RegistrationInfo';
import { UserCar } from '../common/models/UserCar';
import { getAllCars } from '../home/store/home.selectors';
import { CreateEditRegistrationComponent } from './create-edit-registration/create-edit-registration.component';
import { CreateEditRegistrationModel } from './create-edit-registration/create-edit-registration.model';
import {
    deleteRegistrationEntry,
    getRegistrationsForCar,
    getRegistrationsForUser,
} from './store/registrations.actions';
import { userRegistrations } from './store/registrations.selectors';

@Component({
    selector: 'app-registrations',
    templateUrl: './registrations.component.html',
    styleUrls: ['./registrations.component.scss'],
})
export class RegistrationsComponent implements OnInit, OnDestroy {
    carId: number;
    carModel: string;
    registrationsData$: Observable<RegistrationInfo[]>;
    columnsToDisplay = [
        'technicalCheckService',
        'totalPrice',
        'kilometrage',
        'dateOfRegistration',
        'car',
        'additionalComment',
        'actions',
    ];
    myCars: UserCar[];
    private destroy$ = new Subject<void>();

    constructor(private route: ActivatedRoute, private store: Store, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.carId = this.route.snapshot.params['id'];
        this.carModel = this.route.snapshot.params['carModel'];
        if (this.carId == null) {
            this.store.dispatch(getRegistrationsForUser());
        } else {
            this.store.dispatch(getRegistrationsForCar({ carId: this.carId }));
        }

        this.registrationsData$ = this.store.select(userRegistrations);

        this.store
            .select(getAllCars)
            .pipe(takeUntil(this.destroy$))
            .subscribe((cars) => {
                if (this.carId != null) {
                    this.myCars = cars.filter((car) => car.id === +this.carId);
                } else {
                    this.myCars = cars;
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    openCreateOrEditDialog(registration: RegistrationInfo): void {
        const dialogData: CreateEditRegistrationModel = {
            myCars: this.myCars,
            registrationInfo: registration,
        };

        this.dialog.open(CreateEditRegistrationComponent, {
            data: dialogData,
            disableClose: true,
            width: '50%',
        });
    }

    deleteRegistration(registration: RegistrationInfo): void {
        const dialogRef = this.dialog.open(YesNoDialogComponent, {
            data: 'Da li ste sigurni da želite da obrišete ovaj unos o registraciji?',
        });

        dialogRef.afterClosed().subscribe((result: Boolean) => {
            if (result) {
                this.store.dispatch(deleteRegistrationEntry({ registration }));
            }
        });
    }
}
