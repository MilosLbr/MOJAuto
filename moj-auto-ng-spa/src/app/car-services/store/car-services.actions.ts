import { createAction, props } from '@ngrx/store';
import { ServiceDto } from 'src/app/common/models/ServiceDto';

export const getCarServicesForUser = createAction('[Car services] Get car services for user');
export const getCarServicesForUserSuccess = createAction(
    '[Car services] Get car services for user success',
    props<{ carServices: ServiceDto[] }>()
);
export const getCarServicesForUserFail = createAction(
    '[Car services] Get car services for user fail',
    props<{ error: string }>()
);

export const getCarServicesForCar = createAction('[Car services] Get car services for car', props<{ carId: number }>());
export const getCarServicesForCarSuccess = createAction(
    '[Car services] Get car services for car success',
    props<{ carServices: ServiceDto[] }>()
);
export const getCarServicesForCarFail = createAction(
    '[Car services] Get car services for car fail',
    props<{ error: string }>()
);

export const createNewCarServiceEntry = createAction(
    '[Car services] Create new car service entry',
    props<{ carService: ServiceDto }>()
);
export const createNewCarServiceEntrySuccess = createAction(
    '[Car services] Create new car service entry success',
    props<{ carService: ServiceDto }>()
);
export const createNewCarServiceEntryFail = createAction(
    '[Car services] Create new car service entry fail',
    props<{ error: string }>()
);
