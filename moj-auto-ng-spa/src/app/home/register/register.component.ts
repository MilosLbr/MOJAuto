import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserLoginDto } from 'src/app/common/models/UserLoginDto';
import { UserRegisterDto } from 'src/app/common/models/UserRegisterDto';
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
  passwordsAreNotTheSame = false;

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
    this.passwordControl = this.formBuilder.control('', [
      Validators.required, Validators.minLength(5)
    ]);
    this.passwordConfirmControl = this.formBuilder.control('', [
      Validators.required
    ]);

    this.registerForm = this.formBuilder.group({
      userName: this.userNameControl,
      passwordGroup: this.formBuilder.group({
        password: this.passwordControl,
        confirmPassword: this.passwordConfirmControl,
      }, {validators: this.validatePasswordAndConfirmPassword()}),
    });
  }

  validatePasswordAndConfirmPassword(): ValidatorFn {
    return (formControl: AbstractControl): { [key: string]: any } | null => {
      const passwordValue = this.passwordControl?.value;
      const confrimPasswordValue = this.passwordConfirmControl?.value;

      if (passwordValue !== confrimPasswordValue) {
        this.passwordsAreNotTheSame = true;
        return {
          passwordsNotSame: true,
        };
      }

      this.passwordsAreNotTheSame = false;
      return null;
    };
  }

  getPasswordConfirmErrorMessage() {
    console.log(this.passwordConfirmControl);
  }

  onFormSubmit() {
    const userRegisterDto = new UserRegisterDto();
    userRegisterDto.userName = this.userNameControl.value;
    userRegisterDto.password = this.passwordControl.value
    userRegisterDto.confirmPassword = this.passwordConfirmControl.value;

    const userLoginDto = new UserLoginDto();
    userLoginDto.userName = userRegisterDto.userName;
    userLoginDto.password = userRegisterDto.password;

    this.authService.registerUser(userRegisterDto).subscribe(
      () => {
        this.alertify.success('Registracija uspešna!');
        this.registerForm.reset();
      },
      (error) => {
        this.alertify.error('Greška prilikom registracije!');
      },
      () => {
        this.authService.loginUser(userLoginDto).subscribe();
      }
    );
  }

  
}
