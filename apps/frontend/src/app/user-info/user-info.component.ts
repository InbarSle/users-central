import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ApiService } from '../services/api-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '@users-central/shared';
import { MapComponent } from '../map/map.component';
import { MapLocation } from '../interfaces/location';

enum UserInfoSubmitType {
  CREATE = 'Create',
  UPDATE = 'Update'
};

@Component({
  selector: 'users-central-user-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MapComponent],
  providers: [ApiService],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})

export class UserInfoComponent implements OnInit {

  userForm = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required]
  });

  id?: string | null;
  submitted = false;
  location?: MapLocation;

  constructor(private api: ApiService, private route: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.api.getUser$(this.id).subscribe(
        user => this.updateFormFromUser(user)
      );
    }
  }

  get isNewUser() {
    return !this.id;
  }

  submit() {
    this.submitted = true;

    if (!this.userForm.valid || !this.location) { return };

    if (this.isNewUser) {
      this.create();
    } else {
      this.update();
    }
  }

  isControlInvalid(key: string) {
    return this.submitted && this.userForm.get(key)?.errors;
  }

  update() {
    if (this.id) {
      this.api.updateUser$(this.id, {
        fullname: this.userForm.value.fullname ?? '',
        email: this.userForm.value.email ?? '',
        address: this.userForm.value.address ?? '',
        location: {
          lat: this.location?.lat ?? 0,
          long: this.location?.long ?? 0
        }
      }).subscribe(
        {
          next: (user) => this.handleSuccess(UserInfoSubmitType.UPDATE, user),
          error: (error) => this.handleError(UserInfoSubmitType.UPDATE, error)
        });
    }
  }


  create() {
    this.api.createUser$({
      fullname: this.userForm.value.fullname ?? '',
      email: this.userForm.value.email ?? '',
      address: this.userForm.value.address ?? '',
      location: {
        lat: this.location?.lat ?? 0,
        long: this.location?.long ?? 0
      }
    }).subscribe({
      next: (user) => {
        this.id = user.id;
        this.handleSuccess(UserInfoSubmitType.CREATE, user);
      },
      error: (error) => this.handleError(UserInfoSubmitType.CREATE, error)
    });
  }

  updateLocation(location: MapLocation) {
    this.location = location;
    this.submitted = false;
  }

  private updateFormFromUser(user: IUser) {
    this.userForm.setValue({
      fullname: user.fullname,
      email: user.email,
      address: user.address,
    });
    this.location = user.location
  }

  private handleError(context: string, err: any) {
    console.error(err);
    this.toastr.error(`${context} User - Failed`);
  }

  private handleSuccess(context: string, user: IUser) {
    this.updateFormFromUser(user);
    this.toastr.success(`${context} User - Success`);
  }
}



