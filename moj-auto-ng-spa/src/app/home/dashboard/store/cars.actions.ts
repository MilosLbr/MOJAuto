import { createAction, props } from '@ngrx/store';
import { UserCar } from 'src/app/common/models/UserCar';
import { CreateEditCarModel } from '../create-edit-car/create-edit-car.model';

export const fetchAllCars = createAction('[Home/Cars] Fetch all cars');
export const fetchAllCarsSuccess = createAction('[Home/Cars] Fetch all cars success', props<{ cars: UserCar[] }>());
export const fetchAllCarsFail = createAction('[Home/Cars] Fetch all cars fail', props<{ error: string }>());

export const addNewCar = createAction('[Home/Cars] Add new car', props<{ carData: CreateEditCarModel }>());
export const addNewCarSuccess = createAction('[Home/Cars] Add new car success', props<{ carData: UserCar }>());
export const addNewCarFail = createAction('[Home/Cars] Add new car fail', props<{ error: string }>());

export const editCar = createAction('[Home/Cars] Edit car', props<{ carData: CreateEditCarModel }>());
export const editCarSuccess = createAction('[Home/Cars] Edit car success', props<{ carData: UserCar }>());
export const editCarFail = createAction('[Home/Cars] Edit car fail', props<{ error: string }>());

export const deleteCar = createAction('[Home/Cars] Delete car', props<{ carId: number }>());
export const deleteCarSuccess = createAction('[Home/Cars] Delete car success', props<{ carData: UserCar }>());
export const deleteCarFail = createAction('[Home/Cars] Delete car fail', props<{ error: string }>());
