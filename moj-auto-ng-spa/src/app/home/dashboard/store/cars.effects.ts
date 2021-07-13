import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { HttpErrorDialogComponent } from 'src/app/common/components/http-error-dialog/http-error-dialog.component';
import { extractErrorMessageFromResponse } from 'src/app/common/helpers/error-message-extractor';
import { CarsService } from '../services/cars.service';
import {
    addNewCar,
    addNewCarFail,
    addNewCarSuccess,
    deleteCar,
    deleteCarFail,
    deleteCarSuccess,
    editCar,
    editCarFail,
    editCarSuccess,
    fetchAllCars,
    fetchAllCarsFail,
    fetchAllCarsSuccess,
} from './cars.actions';

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

    addNewCarEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addNewCar),
            exhaustMap(({ carData }) =>
                this.carsService.addNewCar(carData).pipe(
                    map((userCar) => addNewCarSuccess({ carData: userCar })),
                    catchError((error: HttpErrorResponse) =>
                        of(addNewCarFail({ error: extractErrorMessageFromResponse(error) }))
                    )
                )
            )
        )
    );

    editCarEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editCar),
            exhaustMap(({ carData }) =>
                this.carsService.editCar(carData).pipe(
                    map((userCar) => editCarSuccess({ carData: userCar })),
                    catchError((error: HttpErrorResponse) =>
                        of(editCarFail({ error: extractErrorMessageFromResponse(error) }))
                    )
                )
            )
        )
    );

    deleteCarEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteCar),
            exhaustMap(({ carId }) =>
                this.carsService.deleteCar(carId).pipe(
                    map((userCar) => deleteCarSuccess({ carData: userCar })),
                    catchError((error: HttpErrorResponse) =>
                        of(deleteCarFail({ error: extractErrorMessageFromResponse(error) }))
                    )
                )
            )
        )
    );

    errorEffect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fetchAllCarsFail, addNewCarFail, editCarFail, deleteCarFail),
                tap((action) => {
                    this.dialogService.open(HttpErrorDialogComponent, {
                        data: action.error,
                    });
                })
            ),
        { dispatch: false }
    );
}
