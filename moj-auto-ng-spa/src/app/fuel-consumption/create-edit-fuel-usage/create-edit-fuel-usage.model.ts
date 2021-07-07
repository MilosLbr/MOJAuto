import { CarBasicInfo } from 'src/app/common/models/CarBasicInfo';
import { FuelUsage } from 'src/app/common/models/FuelUsage';
import { UserCar } from 'src/app/common/models/UserCar';

export class CreateEditFuelUsageModel {
    myCars: UserCar[];
    fuelUsage: FuelUsage;
}
