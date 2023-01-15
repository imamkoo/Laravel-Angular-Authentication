import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css'],
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null,
  };
  constructor(
    private Service: ServiceService,
    private notify: SnotifyService,
    private Notfiy: SnotifyService
  ) {}

  onSubmit() {
    this.Service.sendPasswordResetLink(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.notify.error(error.error.error)
    );
  }

  handleResponse(res: any) {
    this.form.email = null;
  }

  ngOnInit(): void {}
}
