import { Route } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserInfoComponent } from './user-info/user-info.component';

export const appRoutes: Route[] = [
    {
        path:'user/:id',
        component: UserInfoComponent
    },
    {
        path: 'user',
        component: UserInfoComponent
    },
    {
        path:'',
        component: UsersListComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
