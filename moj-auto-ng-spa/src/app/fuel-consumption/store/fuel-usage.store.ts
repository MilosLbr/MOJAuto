import { EntityState } from '@ngrx/entity';
import { FuelUsage } from 'src/app/common/models/FuelUsage';

export const fuelUsageStoreName = 'FuelUsage';

export interface IFuelUsageState extends EntityState<FuelUsage> {
    isLoading: boolean;
}
