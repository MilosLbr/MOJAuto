import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { ServiceDto } from 'src/app/common/models/ServiceDto';
import { ICarServicesState } from './car-services.store';
import * as actions from './car-services.actions';

const adapter: EntityAdapter<ServiceDto> = createEntityAdapter<ServiceDto>({ selectId: (s) => s.id });

const initialState = adapter.getInitialState({ isLoading: false });

const srvcReducer = createReducer(
    initialState,
    on(
        actions.getCarServicesForUser,
        actions.getCarServicesForCar,
        actions.createNewCarServiceEntry,
        actions.deleteCarServiceEntry,
        (state) => ({
            ...state,
            isLoading: true,
        })
    ),
    on(
        actions.getCarServicesForUserFail,
        actions.getCarServicesForCarFail,
        actions.createNewCarServiceEntryFail,
        actions.deleteCarServiceEntryFail,
        (state) => ({ ...state, isLoading: false })
    ),
    on(actions.getCarServicesForUserSuccess, actions.getCarServicesForCarSuccess, (state, action) =>
        adapter.setAll(action.carServices, { ...state, isLoading: false })
    ),
    on(actions.createNewCarServiceEntrySuccess, (state, action) =>
        adapter.addOne(action.carService, { ...state, isLoading: false })
    ),
    on(actions.deleteCarServiceEntrySuccess, (state, action) =>
        adapter.removeOne(action.carService.id, { ...state, isLoading: false })
    )
);

export function carServicesReducer(state: ICarServicesState, action: Action) {
    return srvcReducer(state, action);
}
