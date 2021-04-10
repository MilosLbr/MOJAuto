import { EntityState } from '@ngrx/entity';
import { UserCar } from 'src/app/common/models/UserCar';

export const carsStoreName = 'Cars';

export interface ICarsState extends EntityState<UserCar> {
    isFetching: boolean;
}
