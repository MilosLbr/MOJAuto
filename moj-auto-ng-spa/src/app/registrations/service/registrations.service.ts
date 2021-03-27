import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationInfo } from 'src/app/common/models/RegistrationInfo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRegistrationsForCurrentUser() {
    const url = this.baseUrl + '/registrations/getRegistrationsForCurrentUser';

    return this.http.get<RegistrationInfo[]>(url);
  }
}
