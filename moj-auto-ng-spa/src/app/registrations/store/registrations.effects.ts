import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { RegistrationsService } from '../service/registrations.service';
import * as registrationAction from './registrations.actions';

@Injectable()
export class RegistrationEffects {
  constructor(
    private actions$: Actions,
    private registrationsService: RegistrationsService
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
          )
        )
      )
    )
  );
}
