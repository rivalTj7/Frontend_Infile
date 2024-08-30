import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import {RegistroComponent} from "./pages/registro/registro.component";
import {LoginGuard} from "./_service/login.guard";
import {LoginComponent} from "./pages/login/login.component";
import {SendEmailComponent} from "./pages/send-email/send-email.component";
import {RecuperaPassComponent} from "./pages/recupera-pass/recupera-pass.component";
import {NoticiasComponent} from "./pages/noticias/noticias.component";
import {NotiGuardService} from "./_service/noti.guard";
import {DetalleNoticiaComponent} from "./pages/detalle-noticia/detalle-noticia.component";

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'sendemail', component: SendEmailComponent, canActivate: [LoginGuard] },
  { path: 'change-password/:tokenPassword', component: RecuperaPassComponent, canActivate: [LoginGuard] },
  { path: 'lista', component: NoticiasComponent, canActivate: [NotiGuardService], data: { expectedRol: ['admin', 'user'] } },
  { path: 'detalle/:id', component: DetalleNoticiaComponent, canActivate: [NotiGuardService], data: { expectedRol: ['admin', 'user'] } },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
