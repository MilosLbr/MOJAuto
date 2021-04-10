import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationInfo } from 'src/app/common/models/RegistrationInfo';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RegistrationsService {
    private baseUrl = environment.apiUrl + '/registrations';

    constructor(private http: HttpClient) {}

    getRegistrationsForCurrentUser() {
        const url = this.baseUrl + '/getRegistrationsForCurrentUser';

        return this.http.get<RegistrationInfo[]>(url);
    }

    getRegistrationsForCar(carId: number) {
        const url = this.baseUrl + `/getRegistrationsForCar/${carId}`;

        return this.http.get<RegistrationInfo[]>(url);
    }

    createRegistrationEntry(registration: RegistrationInfo) {
        const url = this.baseUrl;

        return this.http.post<RegistrationInfo>(url, registration);
    }

    updateRegistrationEntry(registration: RegistrationInfo) {
        const url = this.baseUrl;

        return this.http.put<RegistrationInfo>(url, registration);
    }

    deleteRegistrationEntry(registrationId: number) {
        const url = this.baseUrl + '/' + registrationId;

        return this.http.delete<RegistrationInfo>(url);
    }
}
