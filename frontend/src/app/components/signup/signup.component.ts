import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Services/service.service';
import { TokenServiceService } from 'src/app/Services/token-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
  };

  public errorName = null;
  public errorEmail = null;
  public errorPassword = null;

  constructor(
    private Service: ServiceService,
    private Token: TokenServiceService,
    private router: Router
  ) {}

  onSubmit() {
    this.Service.signup(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    this.Token.handle(data.authorisation.token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error: any) {
    this.errorName = error.error.errors.name;
    this.errorEmail = error.error.errors.email;
    this.errorPassword = error.error.errors.password;
  }

  ngOnInit() {}
}
