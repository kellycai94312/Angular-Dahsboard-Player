import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {StageStandardDictionaryComponent} from './stage-standard-dictionary/stage-standard-dictionary.component';

const routes: Routes = [
  {path: '', component: DictionariesComponent},
  {path: 'stage-standard', component: StageStandardDictionaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionaryRoutingModule {
}
