import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { extractErrorMessageFromResponse } from 'src/app/common/helpers/error-message-extractor';
import { RegistrationsService } from '../service/registrations.service';
import * as registrationAction from './registrations.actions';

@Injectable()
export class RegistrationEffects {
    constructor(
        private actions$: Actions,
        private registrationsService: RegistrationsService,
        private dialogService: MatDialog
    ) {}

    getRegistrationsForUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registrationAction.getRegistrationsForUser),
            exhaustMap((_) =>
                this.registrationsService.getRegistrationsForCurrentUser().pipe(
                    map((registrations) =>
                        registrationAction.getRegistrationsForUserSuccess({
                            registrations,
                        })
                    ),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            registrationAction.getRegistrationsForUserFail({
                                error: extractErrorMessageFromResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    getRegistrationsForCar$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registrationAction.getRegistrationsForCar),
            exhaustMap((action) =>
                this.registrationsService.getRegistrationsForCar(action.carId).pipe(
                    map((registrations) =>
                        registrationAction.getRegistrationsForCarSuccess({
                            registrations,
                        })
                    ),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            registrationAction.getRegistrationsForCarFail({
                                error: extractErrorMessageFromResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    errorResponseEffect$ = createEffect(
        () =>
            this.actions$
                .pipe(
                    ofType(
                        registrationAction.getRegistrationsForUserFail,
                        registrationAction.getRegistrationsForCarFail
                    )
                )
                .pipe(tap((action) => {})),
        { dispatch: false }
    );
}
