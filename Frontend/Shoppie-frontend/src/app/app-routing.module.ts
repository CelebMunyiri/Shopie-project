import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
{path:'',component:LandingPageComponent},
{path:'login', component:LoginComponent},
{path:'register', component:RegisterComponent},
{path:'admin',component:AdminPageComponent},
{path:'user',component:UserPageComponent},
{path:'add',component:AddItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
