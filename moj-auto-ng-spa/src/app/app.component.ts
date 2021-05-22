import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AuthService } from './common/services/auth.service';
import { fetchAllCars } from './home/store/home.actions';
import { IAppState } from './store/app.store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'moj-auto-ng-spa';
    private destroy$ = new Subject<void>();

    constructor(private authService: AuthService, private store: Store<IAppState>) {}

    ngOnInit() {
        const isLoggedIn = this.authService.checkIsUserLoggedIn();
        if (isLoggedIn) {
            this.store.dispatch(fetchAllCars());
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
}
