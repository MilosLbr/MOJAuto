import { createAction, props } from '@ngrx/store';
import { UserCar } from 'src/app/common/models/UserCar';
import { CreateEditCarModel } from '../create-edit-car/create-edit-car.model';

export const fetchAllCars = createAction('[Home/Cars] Fetch all cars');
export const fetchAllCarsSuccess = createAction('[Home/Cars] Fetch all cars success', props<{ cars: UserCar[] }>());
export const fetchAllCarsFail = createAction('[Home/Cars] Fetch all cars fail', props<{ error: string }>());

export const addNewCar = createAction('[Home/Cars] Add new car', props<{ carData: CreateEditCarModel }>());
export const addNewCarSuccess = createAction('[Home/Cars] Add new car success', props<{ carData: UserCar }>());
export const addNewCarFail = createAction('[Home/Cars] Add new car fail', props<{ error: string }>());
