import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {DictionaryComponent} from './dictionary/dictionary.component';
import {DictionaryRoutingModule} from './dictionary-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DictionaryRoutingModule
  ],
  declarations: [DictionariesComponent, DictionaryComponent]
})
export class DictionaryModule {
}
