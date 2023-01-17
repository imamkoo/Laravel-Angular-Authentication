import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Snotify, SnotifyService } from 'ng-snotify';
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
    let _router = this.Router;

    this.Notify.confirm('Done!, Now login with new Password', {
      buttons: [
        {
          text: 'Okay',
          action: (toster) => {
            _router.navigateByUrl('/login'), this.Notify.remove(toster.id);
          },
        },
      ],
    });
  }

  handleError(error: any) {
    this.errorEmail = error.error.errors.email;
    this.errorPassword = error.error.errors.password;
  }

  ngOnInit(): void {}
}
