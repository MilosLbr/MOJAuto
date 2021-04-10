import { Action, combineReducers } from '@ngrx/store';
import { homeReducer } from '../home/store/home.reducer';
import { homeStoreName, IHomeState } from '../home/store/home.store';
import { IAppState } from './app.store';

const reducer = combineReducers({
    [homeStoreName]: homeReducer,
});

export function appReducer(state: { Home: IHomeState }, action: Action): IAppState {
    return reducer(state, action);
}
