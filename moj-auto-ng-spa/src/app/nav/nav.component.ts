import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../common/services/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
    destroy$ = new Subject<void>();
    isLoggedIn = false;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.isUserLoggedIn
            .pipe(takeUntil(this.destroy$))
            .subscribe((isLoggedIn) => {
                this.isLoggedIn = isLoggedIn;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    onLogoutClicked() {
        this.authService.logoutUser();
    }
}
