import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css'],
})
export class ResponseResetComponent implements OnInit {
  public errorName = null;
  public errorEmail = null;
  public errorPassword = null;

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null,
  };
  constructor(
    private route: ActivatedRoute,
    private Service: ServiceService,
    private Router: Router,
    private Notify: SnotifyService
  ) {
    route.queryParams.subscribe((params) => {
      this.form.resetToken = params['token'];
    });
  }

  onSubmit() {
    this.Service.changePassword(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }
  handleResponse(data: any) {
    this.Router.navigateByUrl('/login');
  }

  handleError(error: any) {
    console.log(error.error.errors.email);
    this.errorEmail = error.error.errors.email;
    this.errorPassword = error.error.errors.password;
  }

  ngOnInit(): void {}
}
