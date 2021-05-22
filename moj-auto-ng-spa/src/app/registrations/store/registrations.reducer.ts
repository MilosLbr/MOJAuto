import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { RegistrationInfo } from 'src/app/common/models/RegistrationInfo';
import { IRegistrationsState } from './registrations.store';
import * as registrationAction from './registrations.actions';

const adapter: EntityAdapter<RegistrationInfo> = createEntityAdapter<RegistrationInfo>({ selectId: (r) => r.id });

const initialState = adapter.getInitialState({ isLoading: false });

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
            isLoading: true,
        })
    ),
    on(registrationAction.getRegistrationsForUserSuccess, (state, action) =>
        adapter.setAll(action.registrations, { ...state, isLoading: false })
    ),
    on(registrationAction.getRegistrationsForCarSuccess, (state, action) =>
        adapter.setAll(action.registrations, { ...state, isLoading: false })
    ),
    on(registrationAction.createRegistrationEntrySuccess, (state, action) =>
        adapter.addOne(action.registration, { ...state, isLoading: false })
    ),
    on(registrationAction.updateRegistrationEntrySuccess, (state, action) =>
        adapter.updateOne({ id: action.registration.id, changes: action.registration }, { ...state, isLoading: false })
    ),
    on(registrationAction.deleteRegistrationEntrySuccess, (state, action) =>
        adapter.removeOne(action.registration.id, { ...state, isLoading: false })
    ),
    on(
        registrationAction.getRegistrationsForUserFail,
        registrationAction.getRegistrationsForCarFail,
        registrationAction.createRegistrationEntryFail,
        registrationAction.updateRegistrationEntryFail,
        registrationAction.deleteRegistrationEntryFail,
        (state) => ({
            ...state,
            isLoading: false,
        })
    )
);

export function registrationsReducer(state: IRegistrationsState, action: Action) {
    return regReducer(state, action);
}
