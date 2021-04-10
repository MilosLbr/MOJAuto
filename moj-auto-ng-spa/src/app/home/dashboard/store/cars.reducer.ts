import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { UserCar } from 'src/app/common/models/UserCar';
import { fetchAllCars, fetchAllCarsFail, fetchAllCarsSuccess } from './cars.actions';
import { ICarsState } from './cars.store';

const adapter: EntityAdapter<UserCar> = createEntityAdapter<UserCar>({ selectId: (c) => c.id });

const initialState: ICarsState = adapter.getInitialState({
    isFetching: false,
});

const reducer = createReducer(
    initialState,
    on(fetchAllCars, (state, action) => ({ ...state, isFetching: true })),
    on(fetchAllCarsSuccess, (state, action) => adapter.setAll(action.cars, { ...state, isFetching: false })),
    on(fetchAllCarsFail, (state, action) => ({ ...state, isFetching: false }))
);

export function carsReducer(state: ICarsState, action: Action): ICarsState {
    return reducer(state, action);
}
