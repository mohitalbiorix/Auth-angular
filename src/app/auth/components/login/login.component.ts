import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  userLoginData: User[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private _location: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.userService.getRegistredUsers().subscribe({
      next: (users: User[]) => {
        this.userLoginData = users;
      },
      error: (err) => {
        console.error('An error occurred :', err);
      },
      complete: () => console.log('There are no more action happen.'),
    });
  }

  // Initialization of user form.
  initUserForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
          ),
        ],
      ],
    });
  }

  // reset user form
  resetUserForm(): void {
    this.userForm.reset();
  }

  // save login form
  saveLoginForm(): void {
    const { email, password } = this.userForm.value;
    if (this.userForm.invalid) {
      return;
    }
    if (this.userLoginData.length) {
      const user = this.userLoginData.filter((data) => {
        return data.email === email && data.password === password;
      });
      if (user.length) {
        this.authService.setAuthUserInfo({ email, password });
        this.notificationService.success('Login Successfull!');
        this.router.navigate(['/user']);
      } else {
        this.notificationService.error('Email or Password not valid!');
        console.error('An error occurred :');
      }
    }
  }

  // Go to user register page.
  goToRegister(): void {
    this._location.back();
  }

  // error function that showing error message
  public hasError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].hasError(errorName);
  }
}
