import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialougComponent } from 'src/app/shared/component/confirmation-dialoug/confirmation-dialoug.component';
import { User } from 'src/app/shared/model/user.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/shared/services/user.service';
import { EditUserInfoComponent } from '../edit-user-info/edit-user-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'action',
  ];
  ELEMENT_DATA: User[] = [];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.activatedRoute.data.subscribe({
      next: (res: any) => {
        const { users } = res;
        this.dataSource.data = users;
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteUser(userId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialougComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (Boolean(result)) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.getAllUser();
            this.notificationService.success('User Deleted Successfull!');
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
      } else {
        console.log(false);
      }
    });
  }

  async editUserInfo(userId: number) {
    let userData;
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        userData = user;
        const dialogRef = this.dialog.open(EditUserInfoComponent, {
          width: '1000px',
          height: '400px',
          data: userData,
        });

        dialogRef.afterClosed().subscribe({
          next: (res) => {
            if (res?.user) {
              this.userService.updateUser(userId, res.user).subscribe({
                next: (res) => {
                  this.notificationService.success('User Updated Successfull!');
                  this.getAllUser();
                },
                error: (err) => console.log(err),
                complete: () => console.log('complete'),
              });
            }
          },
          error: (err) => console.log(err),
          complete: () => console.log('complete'),
        });
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  resetFilterInput(input: any) {
    input.value = '';
    const filterValue = input.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  logoutUser() {
    this.authService.removeUser();
    this.router.navigate(['/']);
    this.toastr.success('User Logout Successfull!');
  }
}
