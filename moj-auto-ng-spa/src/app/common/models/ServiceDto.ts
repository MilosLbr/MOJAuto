import { CarBasicInfo } from './CarBasicInfo';

export class ServiceDto {
    id: number;
    dateOfService: Date;
    kilometrage: number;
    price: number;
    title: string;
    comment: string;
    carId: number;
    car: CarBasicInfo;
}
