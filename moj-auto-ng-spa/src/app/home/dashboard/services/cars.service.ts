import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCar } from '../../../common/models/UserCar';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { getAllCars } from '../../store/home.selectors';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CarsService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient, private store: Store) {}

    getCarsForUser() {
        const url = `${this.baseUrl}/cars/getCarsForUser`;
        return this.http.get<UserCar[]>(url);
    }

    getMyCarsFromStore(carId: number): UserCar[] {
        let myCars: UserCar[] = [];

        this.store
            .select(getAllCars)
            .pipe(first())
            .subscribe((cars) => {
                if (carId != null) {
                    myCars = cars.filter((car) => car.id === +carId);
                } else {
                    myCars = cars;
                }
            });

        return myCars;
    }
}
