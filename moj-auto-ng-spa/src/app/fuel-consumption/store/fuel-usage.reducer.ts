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
    on(
        actions.getAllFuelUsagesForUser,
        actions.getFuelUsagesForCar,
        actions.createNewFuelUsageEntry,
        actions.updateFuelUsageEntry,
        actions.deleteFuelUsageEntry,
        (state, action) => ({
            ...state,
            isLoading: true,
        })
    ),
    on(
        actions.getAllFuelUsagesForUserFail,
        actions.getFuelUsagesForCarFail,
        actions.createNewFuelUsageEntryFail,
        actions.updateFuelUsageEntryFail,
        actions.deleteFuelUsageEntryFail,
        (state, action) => ({
            ...state,
            isLoading: false,
        })
    ),
    on(actions.getAllFuelUsagesForUserSuccess, (state, action) =>
        adapter.setAll(action.fuelUsages, { ...state, isLoading: false })
    ),
    on(actions.getFuelUsagesForCarSuccess, (state, action) =>
        adapter.setAll(action.fuelUsages, { ...state, isLoading: false })
    ),
    on(actions.createNewFuelUsageEntrySuccess, (state, action) =>
        adapter.addOne(action.fuelUsage, { ...state, isLoading: false })
    ),
    on(actions.updateFuelUsageEntrySuccess, (state, action) =>
        adapter.updateOne({ changes: action.fuelUsage, id: action.fuelUsage.id }, { ...state, isLoading: false })
    ),
    on(actions.deleteFuelUsageEntrySuccess, (state, actions) =>
        adapter.removeOne(actions.fuelUsage.id, { ...state, isLoading: false })
    )
);

export function fuelUsageReducer(state: IFuelUsageState, action: Action) {
    return reducer(state, action);
}
