import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCar } from '../../../common/models/UserCar';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CarsService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getCarsForUser() {
        const url = `${this.baseUrl}/cars/getCarsForUser`;
        return this.http.get<UserCar[]>(url);
    }
}
