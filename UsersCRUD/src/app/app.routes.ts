import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "home", component: HomeComponent},
    { path: 'user', pathMatch: 'full', redirectTo: 'home' },
    {
        path: "user", component: UsersComponent, children:
          [
            { path: "new", component: UserFormComponent },
            { path: ":_idUser", component: UserViewComponent },
            { path: "update/:_idUser", component: UserFormComponent  }
          ]
    },
    { path: "**", redirectTo: 'home' }

];
