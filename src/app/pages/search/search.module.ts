import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatRippleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ]
})
export class SearchModule {
}
