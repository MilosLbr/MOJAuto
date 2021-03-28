import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegistrationInfo } from '../common/models/RegistrationInfo';
import { CreateEditRegistrationComponent } from './create-edit-registration/create-edit-registration.component';
import { getRegistrationsForCar, getRegistrationsForUser } from './store/registrations.actions';
import { userRegistrations } from './store/registrations.selectors';

@Component({
    selector: 'app-registrations',
    templateUrl: './registrations.component.html',
    styleUrls: ['./registrations.component.scss'],
})
export class RegistrationsComponent implements OnInit {
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
    }

    openCreateOrEditDialog(registration: RegistrationInfo): void {
        this.dialog.open(CreateEditRegistrationComponent, {
            data: registration,
            disableClose: true,
            width: '50%',
        });
    }
}
