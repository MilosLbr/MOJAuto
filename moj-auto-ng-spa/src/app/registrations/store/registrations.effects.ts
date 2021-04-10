import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { HttpErrorDialogComponent } from 'src/app/common/components/http-error-dialog/http-error-dialog.component';
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

    createRegistrationEntry$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registrationAction.createRegistrationEntry),
            exhaustMap((action) =>
                this.registrationsService.createRegistrationEntry(action.registration).pipe(
                    map((registration) => registrationAction.createRegistrationEntrySuccess({ registration })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            registrationAction.createRegistrationEntryFail({
                                error: extractErrorMessageFromResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    updateRegistrationEntry$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registrationAction.updateRegistrationEntry),
            exhaustMap((action) =>
                this.registrationsService.updateRegistrationEntry(action.registration).pipe(
                    map((registration) => registrationAction.updateRegistrationEntrySuccess({ registration })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            registrationAction.updateRegistrationEntryFail({
                                error: extractErrorMessageFromResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    deleteRegistrationEntry$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registrationAction.deleteRegistrationEntry),
            exhaustMap((action) =>
                this.registrationsService.deleteRegistrationEntry(action.registration.id).pipe(
                    map((registration) => registrationAction.deleteRegistrationEntrySuccess({ registration })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            registrationAction.deleteRegistrationEntryFail({
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
                        registrationAction.getRegistrationsForCarFail,
                        registrationAction.updateRegistrationEntryFail,
                        registrationAction.deleteRegistrationEntryFail
                    )
                )
                .pipe(
                    tap((action) => {
                        this.dialogService.open(HttpErrorDialogComponent, {
                            data: action.error,
                        });
                    })
                ),
        { dispatch: false }
    );
}
