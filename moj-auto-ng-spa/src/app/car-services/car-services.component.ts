import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCarServicesForCar, getCarServicesForUser } from './store/car-services.actions';

@Component({
    selector: 'app-car-services',
    templateUrl: './car-services.component.html',
    styleUrls: ['./car-services.component.scss'],
})
export class CarServicesComponent implements OnInit {
    carId: number;

    constructor(private route: ActivatedRoute, private store: Store) {}

    ngOnInit(): void {
        this.carId = this.route.snapshot.params['id'];

        if (this.carId == null) {
            this.store.dispatch(getCarServicesForUser());
        } else {
            this.store.dispatch(getCarServicesForCar({ carId: this.carId }));
        }
    }
}
