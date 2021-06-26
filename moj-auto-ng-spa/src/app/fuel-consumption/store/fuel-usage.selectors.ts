import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fuelUsageStoreName, IFuelUsageState } from './fuel-usage.store';

const fuelUsagesState = createFeatureSelector<IFuelUsageState>(fuelUsageStoreName);

export const getFuelUsages = createSelector(fuelUsagesState, (s) => Object.values(s.entities));
