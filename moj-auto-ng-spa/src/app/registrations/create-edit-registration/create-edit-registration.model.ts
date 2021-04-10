import { RegistrationInfo } from 'src/app/common/models/RegistrationInfo';
import { UserCar } from 'src/app/common/models/UserCar';

export interface CreateEditRegistrationModel {
    registrationInfo: RegistrationInfo;
    myCars: UserCar[];
}
