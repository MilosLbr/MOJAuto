import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/LoginResponse';
import { UserLoginDto } from '../models/UserLoginDto';
import { catchError, map } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';
import { of } from 'rxjs';
import { UserRegisterDto } from '../models/UserRegisterDto';

@Injectable({
    providedIn: "root"
})
export class AuthService {

    baseUrl = environment.apiUrl;
    jwtHelper = new JwtHelperService();
    decodedToken;

    constructor( private http: HttpClient, private alertifyService: AlertifyService){}


    loginUser(userLoginDto: UserLoginDto) {
        const url = `${this.baseUrl}/auth/loginUser`;
        return this.http.post<LoginResponse>(url, userLoginDto).pipe(
            map(res => {
                if(res.token){
                    sessionStorage.setItem("token" , res.token);
                    this.decodedToken = this.jwtHelper.decodeToken(res.token);
                    sessionStorage.setItem("username", this.decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
                }
            })            
        )
    }

    registerUser(userRegisterDto: UserRegisterDto) {
        const url = `${this.baseUrl}/auth/registeruser`;
        return this.http.post(url, userRegisterDto);
    }
}