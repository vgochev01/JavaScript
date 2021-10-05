import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, passwordValidator, phoneValidator } from 'src/app/shared/validators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  emailValidator = emailValidator;
  phoneValidator = phoneValidator;
  passwordValidator = passwordValidator;
  phoneCodes = ['+359', '+44', '+41', '+1'];

  constructor(
    private userService: UserService,
    private fb: FormBuilder
    ) {
      this.form = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, emailValidator]],
        code: ['', [Validators.required]],
        phone: ['', [phoneValidator]],
        passwords: [{
          password: '',
          rePassword: ''
        }, [Validators.required, passwordValidator]]
      });
    }

  register(): void {
    //this.userService;
  }
}
