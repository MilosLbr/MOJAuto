import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegistrationInfo } from '../common/models/RegistrationInfo';
import { getRegistrationsForUser } from './store/registrations.actions';
import { userRegistrations } from './store/registrations.selectors';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss'],
})
export class RegistrationsComponent implements OnInit {
  carId: number;
  registrationsForUser$: Observable<RegistrationInfo[]>;
  columnsToDisplay = [
    'technicalCheckService',
    'totalPrice',
    'kilometrage',
    'dateOfRegistration',
    'car',
    'additionalComment',
  ];

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.carId = this.route.snapshot.params['id'];
    this.store.dispatch(getRegistrationsForUser());
    this.registrationsForUser$ = this.store.select(userRegistrations);
  }
}
