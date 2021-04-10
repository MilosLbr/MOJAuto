import { createFeatureSelector, createSelector } from '@ngrx/store';
import { homeStoreName, IHomeState } from '../../store/home.store';

const homeStore = createFeatureSelector<IHomeState>(homeStoreName);

const carsSlice = createSelector(homeStore, (s) => {
    return s.Cars;
});

export const getAllCars = createSelector(carsSlice, (s) => Object.values(s.entities));
