import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceDto } from 'src/app/common/models/ServiceDto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CarServicesService {
    private baseUrl = environment.apiUrl + '/carservices';

    constructor(private http: HttpClient) {}

    getServicesForCar(carId: number): Observable<ServiceDto[]> {
        const url = this.baseUrl + `/GetServicesForCar/${carId}`;

        return this.http.get<ServiceDto[]>(url);
    }

    getServicesForUser(): Observable<ServiceDto[]> {
        const url = this.baseUrl + '/GetUsersServices';

        return this.http.get<ServiceDto[]>(url);
    }

    createNewServiceInfo(service: ServiceDto): Observable<ServiceDto> {
        return this.http.post<ServiceDto>(this.baseUrl, service);
    }

    deleteServiceInfo(serviceId: number): Observable<ServiceDto> {
        const url = this.baseUrl + '/' + serviceId;

        return this.http.delete<ServiceDto>(url);
    }
}
