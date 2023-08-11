import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ConfirmedValidator } from 'src/app/shared/validators/confirmed.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initUserForm();
  }

  // Initialization of registration form
  initUserForm(): void {
    this.userForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(10)]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
            ),
          ],
        ],
        confirm_password: ['', Validators.required],
      },
      {
        validators: [ConfirmedValidator('password', 'confirm_password')],
      } as AbstractControlOptions
    );
  }

  // reset user form
  resetUserForm(): void {
    this.userForm.reset();
  }

  // check if user register with same email id or not
  checkUserWithSameEmailId(currentUser: User): void {
    this.userService.getRegistredUsers().subscribe({
      next: (users: User[]) => {
        const isEmailSame = users.find(
          (user: User) => user.email === currentUser.email
        );
        if (isEmailSame) {
          this.notificationService.error(
            'This email is already register!, please try to other email!'
          );
        } else {
          this.userService.registration(currentUser).subscribe({
            next: () => {
              this.notificationService.success('Registration Successfull!');
              this.router.navigate(['/']);
            },
            error: (err) => {
              this.notificationService.error('Something went wrong!');
              console.error('An error occurred :', err);
            },
            complete: () => console.log('There are no more action happen.'),
          });
        }
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  // save registration form
  async saveRegistrationForm(): Promise<void> {
    const userValue = this.userForm.value;
    const user: User = {
      firstName: userValue.firstName,
      lastName: userValue.lastName,
      email: userValue.email,
      phone: userValue.phone,
      password: userValue.password,
    };
    if (
      !user.firstName &&
      !user.lastName &&
      !user.email &&
      !user.phone &&
      !user.password &&
      !user.confirm_password
    ) {
      this.notificationService.warning('All filed should be required!');
    }
    if (this.userForm.invalid) {
      return;
    }
    await this.checkUserWithSameEmailId(user);
  }

  // error function that showing error message
  public hasError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].hasError(errorName);
  }
}
