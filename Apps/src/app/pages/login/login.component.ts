import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from '../../_model/LoginUsuario';
import { LoginService } from '../../_service/login.service';
import { TokenService } from '../../_service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  oginUsuario: LoginUsuario = new LoginUsuario('', '');
  nombreUsuario: string = '';
  password: string = '';
  errMsj: string = '';

  constructor(
    private tokenService: TokenService,
    private authService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

  }

  onLogin(): void {
    if (!this.nombreUsuario || !this.password) {
      this.toastr.warning('El nombre de usuario y la contraseña son obligatorios', 'Advertencia', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      return;
    }

    const loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);

    this.authService.login(loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.router.navigate(['/']);
      },
      err => {
        this.errMsj = err.error?.mensaje || 'Error al iniciar sesión';
        this.toastr.error(this.errMsj, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
}

