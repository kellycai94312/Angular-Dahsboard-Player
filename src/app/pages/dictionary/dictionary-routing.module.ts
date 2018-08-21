import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {DictionaryComponent} from './dictionary/dictionary.component';

const routes: Routes = [
  {path: '', component: DictionariesComponent},
  {path: ':id', component: DictionaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionaryRoutingModule {
}
