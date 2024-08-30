import { HttpClient } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {LoginUsuario} from "../_model/LoginUsuario";
import {token} from "../_model/token";
import {Usuario} from "../_model/usuario";

@Injectable({
  providedIn: 'root'
})

export class LoginService{
  oauth: string = environment.HOST;

  constructor(
    private httpClient: HttpClient
  ){
  }

  public nuevo(nuevoUsuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(this.oauth + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<token> {
    return this.httpClient.post<token>(this.oauth + 'login', loginUsuario);
  }

  public refresh(dto: token): Observable<token> {
    return this.httpClient.post<token>(this.oauth + 'refresh', dto);
  }

}
