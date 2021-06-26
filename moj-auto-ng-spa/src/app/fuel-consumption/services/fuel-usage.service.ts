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
}
