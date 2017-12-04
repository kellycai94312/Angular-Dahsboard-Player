import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NotFoundPageComponent } from './not-found-page.component';
import { NotFoundPageRoutingModule } from './not-found-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotFoundPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [NotFoundPageComponent]
})
export class NotFoundPageModule { }