import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { HttpErrorDialogComponent } from 'src/app/common/components/http-error-dialog/http-error-dialog.component';
import { extractErrorMessageFromResponse } from 'src/app/common/helpers/error-message-extractor';
import { CarsService } from '../services/cars.service';
import { fetchAllCars, fetchAllCarsFail, fetchAllCarsSuccess } from './cars.actions';

@Injectable({
    providedIn: 'root',
})
export class CarsEffects {
    constructor(private actions$: Actions, private carsService: CarsService, private dialogService: MatDialog) {}

    fetchCars$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchAllCars),
            exhaustMap((_) =>
                this.carsService.getCarsForUser().pipe(
                    map((cars) => fetchAllCarsSuccess({ cars })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            fetchAllCarsFail({
                                error: extractErrorMessageFromResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    errorEffect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fetchAllCarsFail),
                tap((action) => {
                    this.dialogService.open(HttpErrorDialogComponent, {
                        data: action.error,
                    });
                })
            ),
        { dispatch: false }
    );
}
