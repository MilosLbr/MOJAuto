import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { FuelUsage } from 'src/app/common/models/FuelUsage';
import * as actions from './fuel-usage.actions';
import { IFuelUsageState } from './fuel-usage.store';

const adapter: EntityAdapter<FuelUsage> = createEntityAdapter<FuelUsage>({ selectId: (fu) => fu.id });

const initialState = adapter.getInitialState({
    isLoading: false,
});

const reducer = createReducer(
    initialState,
    on(actions.getAllFuelUsagesForUser, (state, action) => ({ ...state, isLoading: true })),
    on(actions.getAllFuelUsagesForUserFail, (state, action) => ({ ...state, isLoading: false })),
    on(actions.getAllFuelUsagesForUserSuccess, (state, action) =>
        adapter.setAll(action.fuelUsages, { ...state, isLoading: false })
    )
);

export function fuelUsageReducer(state: IFuelUsageState, action: Action) {
    return reducer(state, action);
}
