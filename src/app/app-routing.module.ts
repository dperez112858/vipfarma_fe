import { NgModule } from '@angular/core';
import { LoginComponent } from './usuarios/login/login.component';
import { RouterModule, Routes } from '@angular/router';

import { RegistroUsuarioComponent } from './usuarios/registro-usuario/registro-usuario.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  { path: "login",    component: LoginComponent },
  { path: "",         component: HomeComponent},
  { path: "register", component: RegistroUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
