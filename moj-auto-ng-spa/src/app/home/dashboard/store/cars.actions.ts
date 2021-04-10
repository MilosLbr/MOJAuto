import { createAction, props } from '@ngrx/store';
import { UserCar } from 'src/app/common/models/UserCar';

export const fetchAllCars = createAction('[Home/Cars] Fetch all cars');
export const fetchAllCarsSuccess = createAction('[Home/Cars] Fetch all cars success', props<{ cars: UserCar[] }>());
export const fetchAllCarsFail = createAction('[Home/Cars] Fetch all cars fail', props<{ error: string }>());
