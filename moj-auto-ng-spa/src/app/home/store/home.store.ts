import { carsStoreName, ICarsState } from '../dashboard/store/cars.store';

export const homeStoreName = 'Home';

export interface IHomeState {
    [carsStoreName]: ICarsState;
}
