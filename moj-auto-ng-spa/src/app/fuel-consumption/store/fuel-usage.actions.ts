import { createAction, props } from '@ngrx/store';
import { FuelUsage } from 'src/app/common/models/FuelUsage';

export const getAllFuelUsagesForUser = createAction('[Fuel usage] Get all fuel usages for user');
export const getAllFuelUsagesForUserSuccess = createAction(
    '[Fuel usage] Get all fuel usages for user success',
    props<{
        fuelUsages: FuelUsage[];
    }>()
);
export const getAllFuelUsagesForUserFail = createAction(
    '[Fuel usage] Get all fuel usages for user fail',
    props<{ error: string }>()
);
