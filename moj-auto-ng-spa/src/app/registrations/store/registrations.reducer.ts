import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { RegistrationInfo } from 'src/app/common/models/RegistrationInfo';
import { IRegistrationsState } from './registrations.store';
import * as registrationAction from './registrations.actions';

const adapter: EntityAdapter<RegistrationInfo> = createEntityAdapter<RegistrationInfo>({ selectId: (r) => r.id });

const initialState = adapter.getInitialState({ isFetching: false });

const regReducer = createReducer(
    initialState,
    on(
        registrationAction.getRegistrationsForUser,
        registrationAction.getRegistrationsForCar,
        registrationAction.createRegistrationEntry,
        registrationAction.updateRegistrationEntry,
        registrationAction.deleteRegistrationEntry,
        (state) => ({
            ...state,
            isFetching: true,
        })
    ),
    on(registrationAction.getRegistrationsForUserSuccess, (state, action) =>
        adapter.setAll(action.registrations, { ...state, isFetching: false })
    ),
    on(registrationAction.getRegistrationsForCarSuccess, (state, action) =>
        adapter.setAll(action.registrations, { ...state, isFetching: false })
    ),
    on(registrationAction.createRegistrationEntrySuccess, (state, action) =>
        adapter.addOne(action.registration, { ...state, isFetching: false })
    ),
    on(registrationAction.updateRegistrationEntrySuccess, (state, action) =>
        adapter.updateOne({ id: action.registration.id, changes: action.registration }, { ...state, isFetching: false })
    ),
    on(registrationAction.deleteRegistrationEntrySuccess, (state, action) =>
        adapter.removeOne(action.registration.id, { ...state, isFetching: false })
    ),
    on(
        registrationAction.getRegistrationsForUserFail,
        registrationAction.getRegistrationsForCarFail,
        registrationAction.createRegistrationEntryFail,
        registrationAction.updateRegistrationEntryFail,
        registrationAction.deleteRegistrationEntryFail,
        (state) => ({
            ...state,
            isFetching: false,
        })
    )
);

export function registrationsReducer(state: IRegistrationsState, action: Action) {
    return regReducer(state, action);
}
