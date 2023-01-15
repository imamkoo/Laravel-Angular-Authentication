import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ServiceService } from 'src/app/Services/service.service';
import { TokenServiceService } from 'src/app/Services/token-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null,
  };

  public error = null;

  constructor(
    private Service: ServiceService,
    private Token: TokenServiceService,
    private Router: Router,
    private Auth: AuthService
  ) {}

  onSubmit() {
    this.Service.login(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    this.Token.handle(data.authorisation.token);
    this.Auth.changeAuthStatus(true);
    this.Router.navigateByUrl('/profile');
  }

  handleError(error: any) {
    this.error = error.error.message;
  }

  ngOnInit(): void {}
}
