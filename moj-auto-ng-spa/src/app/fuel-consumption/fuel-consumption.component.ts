import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fuel-consumption',
  templateUrl: './fuel-consumption.component.html',
  styleUrls: ['./fuel-consumption.component.scss']
})
export class FuelConsumptionComponent implements OnInit {

  carId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.carId = +this.route.snapshot.params['id'] ;
  }

}
