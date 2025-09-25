import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomainList, FirmList, UsersmasterList } from 'src/app/interface/invoice';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'srno',
    'firstName',
    'lastName',
    'email',
    'roll',
    'userName',
    'password',
    'action',
  ];
  usedDomains: any = [];
  domainsList: any = [];
  usersList: any = []
  usersDataSource = new MatTableDataSource(this.usersList);

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(private dialog: MatDialog,
    private firebaseService: FirebaseService,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUsersList()
    this.getAllDomainList()
  }

  applyFilter(filterValue: string): void {
    this.usersDataSource.filter = filterValue.trim().toLowerCase();
  }

  addUsers(action: string, obj: any) {
    obj.action = action;

    const dialogRef = this.dialog.open(UsersDialogComponent, { data: obj });


    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const userId = localStorage.getItem("userId");

      // if (result.event === 'Add') {
      //   const newDomain = result.data.domainName?.toLowerCase();
      //   const isDomainUsed = this.usedDomains
      //     .some((domain: any) => domain.toLowerCase() === newDomain);

      //   if (isDomainUsed) {
      //     this.openConfigSnackBar('Domain name already used. Please choose another.');
      //     return;
      //   }

      //   ///////////// Add User/////////////////
      //   const userPayload: UsersmasterList = {
      //     id: '',
      //     firstName: result.data.firstName,
      //     lastName: result.data.lastName,
      //     userName: result.data.userName,
      //     email: result.data.email,
      //     password: result.data.password,
      //     userId: userId,
      //     domainName: result.data.domainName,
      //     role: result.data.role,
      //     isActive: result.data.isActive
      //   };

      //   this.firebaseService.addUsers(userPayload).then((res) => {
      //     if (res) {
      //       this.getUsersList();
      //       this.openConfigSnackBar('User record created successfully');
      //     }
      //   }, (error) => {
      //   });

      //   ///////////// Add Domain///////////////
      //   const domainPayload: DomainList = {
      //     id: '',
      //     userId: userId,
      //     domainName: [result.data.domainName],
      //   };

      //   this.firebaseService.addDomain(domainPayload).then((res) => {
      //     if (res) {
      //       this.getAllDomainList();
      //       this.openConfigSnackBar('Domain record created successfully');
      //     }
      //   }, (error) => {
      //   });
      // }

      if (result.event === 'Edit') {
        const userIndex = this.usersList.findIndex((el: any) => el.id === result.data.id);
        if (userIndex !== -1) {
          //////  // Update User /////////
          const userPayload: UsersmasterList = {
            id: result.data.id,
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            userName: result.data.userName,
            email: result.data.email,
            password: result.data.password,
            userId: userId,
            role: result.data.role,
            isActive: this.usersList[userIndex].isActive
          };

          this.firebaseService.updateUsers(result.data.id, userPayload).then((res: any) => {
            this.getUsersList();
            this.openConfigSnackBar('User record updated successfully');
          }, (error) => {
          });
        }

      }

      if (result.event === 'Delete') {
        const userIndex = this.usersList.findIndex((el: any) => el.id === result.data.id);

        if (userIndex !== -1 && this.usersList[userIndex].isActive) {
          const updatedPayload = {
            ...this.usersList[userIndex],
            isActive: false
          };

          this.firebaseService.updateUsers(result.data.id, updatedPayload).then((res: any) => {
            this.getUsersList();
            this.openConfigSnackBar('User deactivated successfully');
          }, (error) => {
          });
        } else {
          this.openConfigSnackBar('User is already inactive or not found');
        }
      }

    });

  }

  getUsersList() {
    this.loaderService.setLoader(true)
    this.firebaseService.getAllUsers().subscribe((res: any) => {
      if (res) {
        this.usersList = res.filter((id: any) => id.userId === localStorage.getItem("userId"))
        this.usedDomains = this.usersList.map((user: any) => user.domainName?.toLowerCase());
        this.usersDataSource = new MatTableDataSource(this.usersList);
        this.usersDataSource.paginator = this.paginator;
        this.loaderService.setLoader(false)
      }
    })
  }

  getAllDomainList() {
    this.loaderService.setLoader(true)
    this.firebaseService.getAllDomain().subscribe((res: any) => {
      if (res) {
        // this.domainsList = res.filter((id: any) => id.userId === localStorage.getItem("userId"))
        //  this.usedDomains = res.map((user:any) => user.domainName?.toLowerCase());
        this.loaderService.setLoader(false)
      }
    })
  }

  openConfigSnackBar(snackbarTitle: any) {
    this._snackBar.open(snackbarTitle, 'Splash', {
      duration: 2 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
