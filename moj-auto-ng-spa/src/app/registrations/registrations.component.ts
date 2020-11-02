import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {

  carId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.carId = this.route.snapshot.params['id'];
  }

}
