import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FuelUsage } from 'src/app/common/models/FuelUsage';

@Injectable({
    providedIn: 'root',
})
export class FuelUsageService {
    private baseUrl = environment.apiUrl + '/fuelUsages';

    constructor(private http: HttpClient) {}

    getAllFuelUsageEntriesForUser(): Observable<FuelUsage[]> {
        const url = this.baseUrl + '/getFuelUsagesForUser';
        return this.http.get<FuelUsage[]>(url);
    }

    getFuelUsagesForCar(carId: number): Observable<FuelUsage[]> {
        const url = this.baseUrl + `/getFuelUsagesForCar/${carId}`;
        return this.http.get<FuelUsage[]>(url);
    }

    createNewFuelUsageEntry(fuelUsage: FuelUsage): Observable<FuelUsage> {
        return this.http.post<FuelUsage>(this.baseUrl, fuelUsage);
    }

    updateFuelUsageEntry(fuelUsage: FuelUsage): Observable<FuelUsage> {
        return this.http.put<FuelUsage>(this.baseUrl, fuelUsage);
    }

    deleteFuelUsageEntry(fuelUsage: FuelUsage): Observable<FuelUsage> {
        const url = this.baseUrl + '/' + fuelUsage.id;
        return this.http.delete<FuelUsage>(url);
    }
}
