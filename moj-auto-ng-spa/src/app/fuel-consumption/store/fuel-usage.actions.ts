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
export const getFuelUsagesForCar = createAction('[Fuel usage] Get all fuel usages for car', props<{ carId: number }>());
export const getFuelUsagesForCarSuccess = createAction(
    '[Fuel usage] Get all fuel usages for car success',
    props<{ fuelUsages: FuelUsage[] }>()
);
export const getFuelUsagesForCarFail = createAction(
    '[Fuel usage] Get all fuel usages for car fail',
    props<{ error: string }>()
);

export const createNewFuelUsageEntry = createAction(
    '[Fuel usage] Create new fuel usage entry',
    props<{ fuelUsage: FuelUsage }>()
);
export const createNewFuelUsageEntrySuccess = createAction(
    '[Fuel usage] Create new fuel usage entry success',
    props<{ fuelUsage: FuelUsage }>()
);
export const createNewFuelUsageEntryFail = createAction(
    '[Fuel usage] Create new fuel usage entry fail',
    props<{ error: string }>()
);

export const updateFuelUsageEntry = createAction(
    '[Fuel usage] Update fuel usage entry',
    props<{ fuelUsage: FuelUsage }>()
);
export const updateFuelUsageEntrySuccess = createAction(
    '[Fuel usage] Update fuel usage entry success',
    props<{ fuelUsage: FuelUsage }>()
);
export const updateFuelUsageEntryFail = createAction(
    '[Fuel usage] Update fuel usage entry fail',
    props<{ error: string }>()
);

export const deleteFuelUsageEntry = createAction(
    '[Fuel usage] Delete fuel usage entry',
    props<{ fuelUsage: FuelUsage }>()
);
export const deleteFuelUsageEntrySuccess = createAction(
    '[Fuel usage] Delete fuel usage entry success',
    props<{ fuelUsage: FuelUsage }>()
);
export const deleteFuelUsageEntryFail = createAction(
    '[Fuel usage] Delete fuel usage entry fail',
    props<{ error: string }>()
);
