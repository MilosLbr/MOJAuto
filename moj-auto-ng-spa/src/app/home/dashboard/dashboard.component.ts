import { Component, OnInit } from '@angular/core';
import { UserCar } from 'src/app/common/models/UserCar';
import { AlertifyService } from 'src/app/common/services/alertify.service';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  myCars: UserCar[];

  constructor(
    private apiService: ApiService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.apiService.getCarsForUser().subscribe(
      (data) => {
        this.myCars = data;
      },
      (error) => {
        this.alertify.error(
          'Greška prilikom dobavljanja informacija o automobilima!'
        );
      }
    );
  }
}
