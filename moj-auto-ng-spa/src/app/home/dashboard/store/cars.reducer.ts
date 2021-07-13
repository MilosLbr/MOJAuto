import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { UserCar } from 'src/app/common/models/UserCar';
import {
    addNewCar,
    addNewCarFail,
    addNewCarSuccess,
    deleteCar,
    deleteCarFail,
    deleteCarSuccess,
    editCar,
    editCarFail,
    editCarSuccess,
    fetchAllCars,
    fetchAllCarsFail,
    fetchAllCarsSuccess,
} from './cars.actions';
import { ICarsState } from './cars.store';

const adapter: EntityAdapter<UserCar> = createEntityAdapter<UserCar>({ selectId: (c) => c.id });

const initialState: ICarsState = adapter.getInitialState({
    isLoading: false,
});

const reducer = createReducer(
    initialState,
    on(fetchAllCars, addNewCar, editCar, deleteCar, (state, action) => ({ ...state, isLoading: true })),
    on(fetchAllCarsFail, addNewCarFail, editCarFail, deleteCarFail, (state, action) => ({
        ...state,
        isLoading: false,
    })),
    on(fetchAllCarsSuccess, (state, action) => adapter.setAll(action.cars, { ...state, isLoading: false })),
    on(addNewCarSuccess, (state, action) => adapter.addOne(action.carData, { ...state, isLoading: false })),
    on(editCarSuccess, (state, action) =>
        adapter.updateOne({ changes: action.carData, id: action.carData.id }, { ...state, isLoading: false })
    ),
    on(deleteCarSuccess, (state, action) => adapter.removeOne(action.carData.id, { ...state, isLoading: false }))
);

export function carsReducer(state: ICarsState, action: Action): ICarsState {
    return reducer(state, action);
}
