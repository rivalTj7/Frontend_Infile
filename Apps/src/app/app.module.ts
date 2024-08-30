import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecuperaPassComponent } from './pages/recupera-pass/recupera-pass.component';
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {ToastModule} from "primeng/toast";
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { DetalleNoticiaComponent } from './pages/detalle-noticia/detalle-noticia.component';
import {interceptorProvider, NotInterceptorService} from "./_service/not-interceptor.service";
NotInterceptorService

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NoticiasComponent,
    RegistroComponent,
    RecuperaPassComponent,
    LoginComponent,
    MenuComponent,
    SendEmailComponent,
    DetalleNoticiaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PasswordModule,
    ToastModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
