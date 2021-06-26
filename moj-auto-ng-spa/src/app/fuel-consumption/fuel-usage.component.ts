import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FuelUsage } from '../common/models/FuelUsage';
import { FuelUsageService } from './services/fuel-usage.service';
import { getAllFuelUsagesForUser } from './store/fuel-usage.actions';
import { getFuelUsages } from './store/fuel-usage.selectors';

@Component({
    selector: 'app-fuel-consumption',
    templateUrl: './fuel-usage.component.html',
    styleUrls: ['./fuel-usage.component.scss'],
})
export class FuelUsageComponent implements OnInit {
    carId: number;
    carModel: string;
    fuelUsageData$: Observable<FuelUsage[]>;
    columnsToDisplay = ['gasStationName', 'liters', 'price', 'dateFiled', 'car', 'kilometrage', 'actions'];

    constructor(private route: ActivatedRoute, private store: Store, private fuelUsageService: FuelUsageService) {}

    ngOnInit(): void {
        this.carId = this.route.snapshot.params['id'];
        this.carModel = this.route.snapshot.params['carModel'];

        if (this.carId == null) {
            this.store.dispatch(getAllFuelUsagesForUser());
        }

        this.fuelUsageData$ = this.store.select(getFuelUsages);
    }

    openCreateOrEditDialog(fuelUsage: FuelUsage) {}

    deleteFuelUsageEntry(fuelUsage: FuelUsage) {}
}
