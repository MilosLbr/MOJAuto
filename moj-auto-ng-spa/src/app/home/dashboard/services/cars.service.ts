import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCar } from '../../../common/models/UserCar';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { getAllCars } from '../../store/home.selectors';
import { first } from 'rxjs/operators';
import { CreateEditCarModel } from '../create-edit-car/create-edit-car.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CarsService {
    baseUrl = environment.apiUrl + '/cars';

    constructor(private http: HttpClient, private store: Store) {}

    getCarsForUser() {
        const url = `${this.baseUrl}/getCarsForUser`;
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

    addNewCar(carData: CreateEditCarModel): Observable<UserCar> {
        const url = this.baseUrl + '/addCar';
        return this.http.post<UserCar>(url, carData);
    }

    editCar(carData: CreateEditCarModel): Observable<UserCar> {
        const url = this.baseUrl + '/editCar';
        return this.http.put<UserCar>(url, carData);
    }

    deleteCar(carId: number): Observable<UserCar> {
        const url = this.baseUrl + '/deleteCar/' + carId;
        return this.http.delete<UserCar>(url);
    }
}
