import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { el } from 'date-fns/locale';
import { UsersmasterList, DomainList } from 'src/app/interface/invoice';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader.service';
// import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent implements OnInit {
  UsersForm: FormGroup
  action: any;
  local_data: any;
  roleType: any = ['Admin', 'User', 'Customer']
  // finalDomainList: string[] = [];
  usedDomains: any = [];
  // domainsList: any = [];
  usersList: any = []
  allUsersList: any = []


  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<UsersDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private firebaseService: FirebaseService,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  // ngOnInit(): void {
  //   this.initializeFormControls()
  //   this.getAllDomainList()
  //   this.getUsersList()
  //   if (this.action === 'Edit') {
  //     this.UsersForm.controls['firstName'].setValue(this.local_data.firstName)
  //     this.UsersForm.controls['lastName'].setValue(this.local_data.lastName)
  //     this.UsersForm.controls['userName'].setValue(this.local_data.userName)
  //     this.UsersForm.controls['email'].setValue(this.local_data.email)
  //     this.UsersForm.controls['password'].setValue(this.local_data.password)
  //     this.UsersForm.controls['domainName'].setValue(this.local_data.domainName)
  //     this.UsersForm.controls['role'].setValue(this.local_data.role)
  //     this.UsersForm.controls['isActive'].setValue(this.local_data.isActive)
  //   }
  // }



  // submit() {
  //   const payload = {
  //     id: this.local_data.id ? this.local_data.id : '',
  //     firstName: this.UsersForm.value.firstName,
  //     lastName: this.UsersForm.value.lastName,
  //     userName: this.UsersForm.value.userName,
  //     email: this.UsersForm.value.email,
  //     password: this.UsersForm.value.password,
  //     domainName: this.UsersForm.value.domainName,
  //     role: this.UsersForm.value.role,
  //     isActive: this.UsersForm.value.isActive
  //   }

  //   if (!this.local_data.id) {

  //     const userId = localStorage.getItem("userId");
  //     if (this.action === 'Add') {
  //       const newDomain = payload.domainName?.toLowerCase();
  //       const isDomainUsed = this.usedDomains
  //         .some((domain: any) => domain.toLowerCase() === newDomain);

  //       if (isDomainUsed) {
  //         this.openConfigSnackBar('Domain name already used. Please choose another.');
  //         return;
  //       }

  //       ///////////// Add User/////////////////
  //       const userPayload: UsersmasterList = {
  //         id: '',
  //         firstName: payload.firstName,
  //         lastName: payload.lastName,
  //         userName: payload.userName,
  //         email: payload.email,
  //         password: payload.password,
  //         userId: userId,
  //         domainName: payload.domainName,
  //         role: payload.role,
  //         isActive: payload.isActive
  //       };

  //       this.firebaseService.addUsers(userPayload).then((res) => {
  //         if (res) {
  //           this.getUsersList();
  //           this.openConfigSnackBar('User record created successfully');
  //         }
  //       }, (error) => {
  //       });

  //       ///////////// Add Domain///////////////
  //       // const domainPayload: DomainList = {
  //       //   id: '',
  //       //   userId: userId,
  //       //   domainName: [payload.domainName],
  //       // };

  //       // this.firebaseService.addDomain(domainPayload).then((res) => {
  //       //   if (res) {
  //       //     this.getAllDomainList();
  //       //     this.openConfigSnackBar('Domain record created successfully');
  //       //       this.dialogRef.close(true); 
  //       //   }
  //       // }, (error) => {
  //       // });
  //     }
  //   } else {
  //     this.dialogRef.close({ event: this.action, data: payload });
  //   }
  // }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAllUsers();

    if (this.action === 'Edit') {
      this.patchFormWithExistingData();
    }
    this.UsersForm.get('email')?.valueChanges.subscribe(email => {
      const lowerEmail = email?.toLowerCase();
      const isTaken = this.allUsersList.some(
        (user: any) => user.email?.toLowerCase() === lowerEmail
      );
      this.UsersForm.get('email')?.setErrors(isTaken ? { emailTaken: true } : null);
    });
  }

  private initializeFormControls() {
    this.UsersForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      userName: [''],
      email: [''],
      password: [''],
      role: [''],
      isActive: [false]
    })
  }

  private initializeForm(): void {
    this.initializeFormControls(); // Rename this to initializeFormControls for clarity
  }

  private loadAllUsers(): void {
    this.getUsersList();
  }

  private patchFormWithExistingData(): void {
    if (!this.local_data) return;

    this.UsersForm.patchValue({
      firstName: this.local_data.firstName,
      lastName: this.local_data.lastName,
      userName: this.local_data.userName,
      email: this.local_data.email,
      password: this.local_data.password,
      role: this.local_data.role,
      isActive: this.local_data.isActive
    });
  }


  submit(): void {
    const form = this.UsersForm.value;

    const payload = {
      id: this.local_data.id ?? '',
      firstName: form.firstName,
      lastName: form.lastName,
      userName: form.userName,
      email: form.email,
      password: form.password,
      role: form.role,
      isActive: form.isActive
    };
    if (this.isAddingNewUser()) {
      this.addNewUser(payload);
    } else {
      this.dialogRef.close({ event: this.action, data: payload });
    }
  }

  private isAddingNewUser(): boolean {
    return !this.local_data.id && this.action === 'Add';
  }


  private addNewUser(payload: any): void {
    const userId = localStorage.getItem('userId') || '';

    const userPayload: UsersmasterList = {
      id: '',
      firstName: payload.firstName,
      lastName: payload.lastName,
      userName: payload.userName,
      email: payload.email,
      password: payload.password,
      userId: userId,
      role: payload.role,
      isActive: payload.isActive
    };

    this.firebaseService.addUsers(userPayload).then(
      (res) => {
        if (res) {
          this.getUsersList();
          this.openConfigSnackBar('User record created successfully');
          this.dialogRef.close(true); // Close dialog after successful add
        }
      },
      (error) => {
        console.error('Error creating user:', error);
        this.openConfigSnackBar('Failed to create user. Please try again.');
      }
    );
  }



  getUsersList() {
    this.loaderService.setLoader(true)
    this.firebaseService.getAllUsers().subscribe((res: any) => {
      if (res) {
        this.allUsersList = res
        this.usersList = res.filter((id: any) => id.userId === localStorage.getItem("userId"))
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

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
