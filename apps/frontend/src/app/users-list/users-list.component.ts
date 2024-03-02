import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api-service.service';
import { Observable, of } from 'rxjs';
import { IUser } from '@users-central/shared';

@Component({
  selector: 'users-central-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [ApiService],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit{
  public users$: Observable<IUser[] | undefined> = of(undefined);
  
  constructor(private api: ApiService) {}

  public ngOnInit() {
    this.users$ = this.api.getAllUsers$();
  }
  

}
