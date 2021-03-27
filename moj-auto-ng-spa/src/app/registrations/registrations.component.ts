import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getRegistrationsForUser } from './store/registrations.actions';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss'],
})
export class RegistrationsComponent implements OnInit {
  carId: number;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.carId = this.route.snapshot.params['id'];
    this.store.dispatch(getRegistrationsForUser());
  }
}
