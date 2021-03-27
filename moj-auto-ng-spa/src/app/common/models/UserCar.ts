import { ApplicationUser } from './ApplicationUser';

export class UserCar {
  id: number;
  model: string;
  kilometrage: number;
  manufactureYear: number;
  engineCubicCapacity: number;
  enginePowerKW: number;
  applicationUser: ApplicationUser;
}
