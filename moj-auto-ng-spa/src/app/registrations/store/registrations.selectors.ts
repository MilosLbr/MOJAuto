import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IRegistrationsState,
  registrationsStoreName,
} from './registrations.store';

const registrations = createFeatureSelector<IRegistrationsState>(
  registrationsStoreName
);

export const userRegistrations = createSelector(registrations, (s) =>
  Object.values(s.entities)
);
