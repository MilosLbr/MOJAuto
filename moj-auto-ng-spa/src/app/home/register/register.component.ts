import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AlertifyService } from 'src/app/common/services/alertify.service';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userNameControl: FormControl;
  passwordControl: FormControl;
  passwordConfirmControl: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userNameControl = this.formBuilder.control('', Validators.required);
    this.passwordControl = this.formBuilder.control('', Validators.required);
    this.passwordConfirmControl = this.formBuilder.control('', [
      Validators.required,
      this.validatePasswordAndConfirmPassword(),
    ]);

    this.registerForm = this.formBuilder.group({
      userName: this.userNameControl,
      password: this.passwordControl,
      confirmPassword: this.passwordConfirmControl,
    });
  }

  validatePasswordAndConfirmPassword(): ValidatorFn {
    return (formControl: AbstractControl): { [key: string]: any } | null => {
      const passwordValue = this.passwordControl.value;
      const confrimPasswordValue = formControl.value;

      if (passwordValue !== confrimPasswordValue) {
        return {
          passwordsNotSame: true,
        };
      }

      return null;
    };
  }

  getPasswordConfirmErrorMessage() {
    console.log(this.passwordConfirmControl)
  }

  onFormSubmit() {}
}
