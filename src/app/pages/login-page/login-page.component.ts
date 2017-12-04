import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from "../../data/index";
import { log } from 'util';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  constructor(private translate: TranslateService) {
    log(Locale.English);
  }

  ngOnInit() {
  }

}
