import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { log } from 'util';

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.scss']
})
export class PasswordResetPageComponent implements OnInit {

  public email: string;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  public onApply(event: any): void {
    var result = event.validationGroup.validate();
    if (result.isValid) {
    }
  }

}
