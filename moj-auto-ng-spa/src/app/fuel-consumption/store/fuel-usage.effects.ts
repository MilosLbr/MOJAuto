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
}
