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
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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

  // get all registered users from resolver route
  getAllUser(): void {
    this.activatedRoute.data.subscribe({
      next: (usersData) => {
        const { users } = usersData;
        this.dataSource.data = users;
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // delete registered user
  deleteUser(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialougComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (Boolean(result)) {
        this.userService.deleteUser(userId).subscribe({
          next: (user: User) => {
            if (user) {
              this.userService.getRegistredUsers().subscribe({
                next: (users: User[]) => {
                  if (users) {
                    this.dataSource.data = users;
                    this.notificationService.success(
                      'User Deleted Successfull!'
                    );
                  }
                },
                error: (err) => console.log(err),
                complete: () => console.log('completed'),
              });
            }
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

  // edit registerd user info
  async editUserInfo(userId: number): Promise<void> {
    let userData: User;
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        userData = user;
        const dialogRef = this.dialog.open(EditUserInfoComponent, {
          width: '1000px',
          height: '400px',
          data: userData,
        });

        dialogRef.afterClosed().subscribe({
          next: ({ user }) => {
            if (user) {
              this.userService.updateUser(userId, user).subscribe({
                next: (updatedUser) => {
                  if (updatedUser) {
                    this.userService.getRegistredUsers().subscribe({
                      next: (users: User[]) => {
                        if (users) {
                          this.dataSource.data = users;
                          this.notificationService.success(
                            'User Updated Successfull!'
                          );
                        }
                      },
                      error: (err) => console.log(err),
                      complete: () => console.log('completed'),
                    });
                  }
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

  // reset filter input
  resetFilterInput(input: HTMLInputElement): void {
    input.value = '';
    const filterValue = input.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // apply filter on input
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // logout user
  logoutUser(): void {
    this.authService.removeUser();
    this.router.navigate(['/']);
    this.toastr.success('User Logout Successfull!');
  }
}
