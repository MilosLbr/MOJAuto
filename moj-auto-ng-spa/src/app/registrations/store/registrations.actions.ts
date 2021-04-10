import { createAction, props } from '@ngrx/store';
import { RegistrationInfo } from 'src/app/common/models/RegistrationInfo';

export const getRegistrationsForUser = createAction('[Registrations] Get registrations for user');
export const getRegistrationsForUserSuccess = createAction(
    '[Registrations] Get registrations for user success',
    props<{ registrations: RegistrationInfo[] }>()
);
export const getRegistrationsForUserFail = createAction(
    '[Registrations] Get registrations for user fail',
    props<{ error: string }>()
);

export const getRegistrationsForCar = createAction(
    '[Registrations] Get registrations for car',
    props<{ carId: number }>()
);
export const getRegistrationsForCarSuccess = createAction(
    '[Registrations] Get registrations for car success',
    props<{ registrations: RegistrationInfo[] }>()
);
export const getRegistrationsForCarFail = createAction(
    '[Registrations] Get registrations for car fail',
    props<{ error: string }>()
);

export const createRegistrationEntry = createAction(
    '[Registrations] Create registration entry',
    props<{ registration: RegistrationInfo }>()
);
export const createRegistrationEntrySuccess = createAction(
    '[Registrations] Create registration entry success',
    props<{ registration: RegistrationInfo }>()
);
export const createRegistrationEntryFail = createAction(
    '[Registrations] Create registration entry fail',
    props<{ error: string }>()
);

export const updateRegistrationEntry = createAction(
    '[Registrations] Update registration entry',
    props<{ registration: RegistrationInfo }>()
);
export const updateRegistrationEntrySuccess = createAction(
    '[Registrations] Update registration entry success',
    props<{ registration: RegistrationInfo }>()
);
export const updateRegistrationEntryFail = createAction(
    '[Registrations] Update registration entry fail',
    props<{ error: string }>()
);

export const deleteRegistrationEntry = createAction(
    '[Registrations] Delete registration entry',
    props<{ registration: RegistrationInfo }>()
);
export const deleteRegistrationEntrySuccess = createAction(
    '[Registrations] Delete registration entry success',
    props<{ registration: RegistrationInfo }>()
);
export const deleteRegistrationEntryFail = createAction(
    '[Registrations] Delete registration entry fail',
    props<{ error: string }>()
);
