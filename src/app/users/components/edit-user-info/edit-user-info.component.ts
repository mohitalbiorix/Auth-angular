import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss'],
})
export class EditUserInfoComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    if (this.user) {
      this.setUserFormValue(this.user);
    }
  }

  // patch value of user form
  setUserFormValue(user: User): void {
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });
  }

  // initialization of user form
  initUserForm(): void {
    this.userForm = this.fb.group({
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
    });
  }

  // update user form
  updateUserInfo(): void {
    if (this.userForm.invalid) {
      return;
    }
    const user = {
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };
    this.authService.setAuthUserInfo(user);
    this.dialogRef.close({ user: this.userForm.value });
  }

  // reset user form
  resetUserFormInfo(): void {
    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      password: this.user.password,
    });
  }

  // close dialoug of user form
  ondialogClose(): void {
    this.dialogRef.close({ user: null });
  }

  // error function that showing error message
  public hasError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].hasError(errorName);
  }
}
