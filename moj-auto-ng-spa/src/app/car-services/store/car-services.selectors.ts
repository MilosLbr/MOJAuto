import { createFeatureSelector, createSelector } from '@ngrx/store';
import { carServicesStoreName, ICarServicesState } from './car-services.store';

const carServicesFeature = createFeatureSelector<ICarServicesState>(carServicesStoreName);

export const carServices = createSelector(carServicesFeature, (s) => Object.values(s.entities));
