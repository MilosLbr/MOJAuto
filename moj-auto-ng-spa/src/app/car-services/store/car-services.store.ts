import { EntityState } from '@ngrx/entity';
import { ServiceDto } from 'src/app/common/models/ServiceDto';

export const carServicesStoreName = 'CarServices';

export interface ICarServicesState extends EntityState<ServiceDto> {
    isLoading: boolean;
}
