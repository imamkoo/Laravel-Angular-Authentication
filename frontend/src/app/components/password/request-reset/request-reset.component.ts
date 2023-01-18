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
    private Notify: SnotifyService
  ) {}

  onSubmit() {
    this.Notify.info('Wait...', { timeout: 5000 });
    this.Service.sendPasswordResetLink(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.Notify.error(error.error.error)
    );
  }

  handleResponse(res: any) {
    this.Notify.success(res.data, { timeout: 5000 });
    this.form.email = null;
  }

  ngOnInit(): void {}
}
