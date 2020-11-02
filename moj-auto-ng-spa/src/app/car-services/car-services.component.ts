import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-services',
  templateUrl: './car-services.component.html',
  styleUrls: ['./car-services.component.scss']
})
export class CarServicesComponent implements OnInit {

  carId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.carId = this.route.snapshot.params['id'];
  }

}
