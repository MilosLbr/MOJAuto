import { Action, combineReducers } from '@ngrx/store';
import { carsReducer } from '../dashboard/store/cars.reducer';
import { carsStoreName } from '../dashboard/store/cars.store';
import { IHomeState } from './home.store';

const reducers = combineReducers<IHomeState>({ [carsStoreName]: carsReducer });

export function homeReducer(state: IHomeState, action: Action): IHomeState {
    return reducers(state, action);
}
