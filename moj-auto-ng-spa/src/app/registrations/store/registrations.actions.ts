import { createAction, props } from '@ngrx/store';
import { RegistrationCreateInfo } from 'src/app/common/models/RegistrationCreateInfo';
import { RegistrationInfo } from 'src/app/common/models/RegistrationInfo';

export const getRegistrationsForUser = createAction(
    '[Registrations] Get registrations for user'
);
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
    props<{ registration: RegistrationCreateInfo }>()
);
export const createRegistrationEntrySuccess = createAction(
    '[Registrations] Create registration entry success',
    props<{ registration: RegistrationInfo }>()
);
export const createRegistrationEntryFail = createAction(
    '[Registrations] Create registration entry fail',
    props<{ error: string }>()
);
