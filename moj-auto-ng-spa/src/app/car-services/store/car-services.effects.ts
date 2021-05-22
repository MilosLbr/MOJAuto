import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { extractErrorMessageFromResponse } from 'src/app/common/helpers/error-message-extractor';
import { CarServicesService } from '../services/car-services.service';
import * as actions from './car-services.actions';

@Injectable()
export class CarServicesEffects {
    constructor(
        private carServicesService: CarServicesService,
        private actions$: Actions,
        private dialogService: MatDialog
    ) {}

    getServicesForUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.getCarServicesForUser),
            exhaustMap((_) =>
                this.carServicesService.getServicesForUser().pipe(
                    map((carServices) => actions.getCarServicesForUserSuccess({ carServices })),
                    catchError((error: HttpErrorResponse) =>
                        of(actions.getCarServicesForUserFail({ error: extractErrorMessageFromResponse(error) }))
                    )
                )
            )
        )
    );

    getServicesForCar$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.getCarServicesForCar),
            exhaustMap(({ carId }) =>
                this.carServicesService.getServicesForCar(carId).pipe(
                    map((carServices) => actions.getCarServicesForCarSuccess({ carServices })),
                    catchError((error: HttpErrorResponse) =>
                        of(actions.getCarServicesForCarFail({ error: extractErrorMessageFromResponse(error) }))
                    )
                )
            )
        )
    );

    createNewServiceEntry$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.createNewCarServiceEntry),
            exhaustMap(({ carService }) =>
                this.carServicesService.createNewServiceInfo(carService).pipe(
                    map((carService) => actions.createNewCarServiceEntrySuccess({ carService })),
                    catchError((error: HttpErrorResponse) =>
                        of(actions.createNewCarServiceEntryFail({ error: extractErrorMessageFromResponse(error) }))
                    )
                )
            )
        )
    );
}
