import { ServiceDto } from 'src/app/common/models/ServiceDto';
import { UserCar } from 'src/app/common/models/UserCar';

export interface CreateEditCarServiceModel {
    carServiceInfo: ServiceDto;
    myCars: UserCar[];
}
