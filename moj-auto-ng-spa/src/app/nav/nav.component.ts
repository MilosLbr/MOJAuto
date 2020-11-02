import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogoutClicked() {
    this.authService.logoutUser();
  }

}
