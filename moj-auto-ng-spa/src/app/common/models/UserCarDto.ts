import { ApplicationUserDto } from './ApplicationUserDto';

export class UserCarDto {
    id: number;
    model: string;
    kilometrage: number;
    manufactureYear: number;
    engineCubicCapacity: number;
    enginePowerKW: number;
    applicationUser: ApplicationUserDto
}
