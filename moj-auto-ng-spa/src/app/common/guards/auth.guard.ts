import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        const isLoggedIn = this.authService.checkIsUserLoggedIn();

        if (!isLoggedIn) {
            this.router.navigate(['']);
        }

        return isLoggedIn;
    }
}
