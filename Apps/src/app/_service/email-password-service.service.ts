import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {EmailValuesDTO} from "../_model/email-value-dto";
import {Observable} from "rxjs";
import {ResetPasswordDTO} from "../_model/ResetPasswordDTO";

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService{

  changePasswordURL = environment.HOST3;

  constructor(
    private httpClient: HttpClient
  ) { }

  public sendEmail(dto: EmailValuesDTO): Observable<any> {
    return this.httpClient.post<any>(this.changePasswordURL + 'send-email', dto);
  }

  public changePassword(dto: ResetPasswordDTO): Observable<any> {
    return this.httpClient.post<any>(this.changePasswordURL + 'change-password', dto);
  }
}
