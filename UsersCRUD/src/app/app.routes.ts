import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserViewComponent } from './pages/user-view/user-view.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "home", component: HomeComponent},
    { path: "user/new", component: UserFormComponent },
    { path: "user/:_idUser", component: UserViewComponent},
    { path: "user/update/:_idUser", component: UserFormComponent },
    { path: "**", redirectTo: 'home' }

];
