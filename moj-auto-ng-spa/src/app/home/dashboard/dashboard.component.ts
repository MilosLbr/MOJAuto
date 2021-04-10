import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserCar } from 'src/app/common/models/UserCar';
import { IHomeState } from '../store/home.store';
import { getAllCars } from './store/cars.selectors';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    myCars$: Observable<UserCar[]>;

    constructor(private store: Store<IHomeState>) {}

    ngOnInit(): void {
        this.myCars$ = this.store.select(getAllCars);
    }
}
