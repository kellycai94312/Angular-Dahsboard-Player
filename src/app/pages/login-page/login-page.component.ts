import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public login: string;
  public password: string;

  constructor(private translate: TranslateService) {

  }

  ngOnInit() {
  }

  public onApply(event: any): void {
    var result = event.validationGroup.validate();
    if (result.isValid) {
    }
  }

}
