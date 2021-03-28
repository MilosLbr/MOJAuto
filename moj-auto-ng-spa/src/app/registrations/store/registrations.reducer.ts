import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { RegistrationInfo } from 'src/app/common/models/RegistrationInfo';
import { IRegistrationsState } from './registrations.store';
import * as registrationAction from './registrations.actions';

const adapter: EntityAdapter<RegistrationInfo> = createEntityAdapter<RegistrationInfo>({ selectId: (r) => r.id });

const initialState = adapter.getInitialState({ isFetching: false });

const regReducer = createReducer(
    initialState,
    on(registrationAction.getRegistrationsForUser, registrationAction.getRegistrationsForCar, (state) => ({
        ...state,
        isFetching: true,
    })),
    on(registrationAction.getRegistrationsForUserSuccess, (state, action) =>
        adapter.setAll(action.registrations, { ...state, isFetching: false })
    ),
    on(registrationAction.getRegistrationsForCarSuccess, (state, action) =>
        adapter.setAll(action.registrations, { ...state, isFetching: false })
    ),
    on(registrationAction.getRegistrationsForUserFail, registrationAction.getRegistrationsForCarFail, (state) => ({
        ...state,
        isFetching: false,
    }))
);

export function registrationsReducer(state: IRegistrationsState, action: Action) {
    return regReducer(state, action);
}
