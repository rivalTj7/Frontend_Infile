import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../_service/token.service";


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  nombreUsuario: string | null  = '';

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.nombreUsuario = this.tokenService.getUserName();
  }
}
