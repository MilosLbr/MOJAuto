import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { extractErrorMessageFromResponse } from 'src/app/common/helpers/error-message-extractor';
import { FuelUsageService } from '../services/fuel-usage.service';
import * as fuelUsagesActions from './fuel-usage.actions';

@Injectable({
    providedIn: 'root',
})
export class FuelUsageEffects {
    constructor(private fuelUsageService: FuelUsageService, private actions$: Actions) {}

    getFuelUsagesForUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fuelUsagesActions.getAllFuelUsagesForUser),
            exhaustMap((_) =>
                this.fuelUsageService.getAllFuelUsageEntriesForUser().pipe(
                    map((fuelUsages) => fuelUsagesActions.getAllFuelUsagesForUserSuccess({ fuelUsages })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            fuelUsagesActions.getAllFuelUsagesForUserFail({
                                error: extractErrorMessageFromResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    getFuelUsagesForCar$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fuelUsagesActions.getFuelUsagesForCar),
            exhaustMap((action) =>
                this.fuelUsageService.getFuelUsagesForCar(action.carId).pipe(
                    map((fuelUsages) => fuelUsagesActions.getFuelUsagesForCarSuccess({ fuelUsages })),
                    catchError((error: HttpErrorResponse) =>
                        of(fuelUsagesActions.getFuelUsagesForCarFail({ error: extractErrorMessageFromResponse(error) }))
                    )
                )
            )
        )
    );

    createFuelUsageEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fuelUsagesActions.createNewFuelUsageEntry),
            exhaustMap((action) =>
                this.fuelUsageService.createNewFuelUsageEntry(action.fuelUsage).pipe(
                    map((fuelUsage) => fuelUsagesActions.createNewFuelUsageEntrySuccess({ fuelUsage })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            fuelUsagesActions.createNewFuelUsageEntryFail({
                                error: extractErrorMessageFromResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    udpateFuelUsageEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fuelUsagesActions.updateFuelUsageEntry),
            exhaustMap((action) =>
                this.fuelUsageService.updateFuelUsageEntry(action.fuelUsage).pipe(
                    map((fuelUsage) => fuelUsagesActions.updateFuelUsageEntrySuccess({ fuelUsage })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            fuelUsagesActions.updateFuelUsageEntryFail({
                                error: extractErrorMessageFromResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );

    deleteFuelUsageEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fuelUsagesActions.deleteFuelUsageEntry),
            exhaustMap((action) =>
                this.fuelUsageService.deleteFuelUsageEntry(action.fuelUsage).pipe(
                    map((fuelUsage) => fuelUsagesActions.deleteFuelUsageEntrySuccess({ fuelUsage })),
                    catchError((error: HttpErrorResponse) =>
                        of(
                            fuelUsagesActions.deleteFuelUsageEntryFail({
                                error: extractErrorMessageFromResponse(error),
                            })
                        )
                    )
                )
            )
        )
    );
}
