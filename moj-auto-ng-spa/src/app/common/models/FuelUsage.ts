import { CarBasicInfo } from './CarBasicInfo';

export class FuelUsage {
    id: number;
    dateFilled: Date;
    price: number;
    kilometrage: number;
    litersFilled: number;
    gasStationName: string;
    carId: number;
    car: CarBasicInfo;
}
