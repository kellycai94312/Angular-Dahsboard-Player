import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { log } from 'util';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private translate: TranslateService) {

  }

  ngOnInit() {
  }

  passwordComparison = () => {
    return this.password;
  };

  public onApply(event: any): void {
    var result = event.validationGroup.validate();
    if (result.isValid) {
    }
  }

}
