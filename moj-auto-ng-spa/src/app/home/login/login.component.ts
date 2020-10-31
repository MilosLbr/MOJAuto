import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/common/services/alertify.service';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userNameControl: FormControl;
  passwordControl: FormControl;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userNameControl = this.formBuilder.control("", Validators.required);
    this.passwordControl = this.formBuilder.control("", Validators.required);

    this.loginForm = this.formBuilder.group({
      userName: this.userNameControl,
      password: this.passwordControl
    })
  }

  onFormSubmit() {
    const userLoginDto = this.loginForm.value;
    
    this.authService.loginUser(userLoginDto).subscribe(() => {
      this.alertify.success("Uspešna prijava!");
      this.loginForm.reset();
    },
      error => {
        this.alertify.error(error.error);        
      }
    )
  }
}
