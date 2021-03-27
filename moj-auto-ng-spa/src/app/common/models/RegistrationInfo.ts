import { CarBasicInfo } from './CarBasicInfo';

export class RegistrationInfo {
  id: number;
  dateOfRegistration: Date;
  technicalCheckService: string;
  kilometrage: number;
  totalPrice: number;
  additionalComment: string;
  carId: number;
  car: CarBasicInfo;
}
