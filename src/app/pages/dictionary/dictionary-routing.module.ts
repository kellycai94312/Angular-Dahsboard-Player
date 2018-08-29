import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {StageStandardDictionaryComponent} from './stage-standard-dictionary/stage-standard-dictionary.component';
import {StageDictionaryComponent} from './stage-dictionary/stage-dictionary.component';
import {StageTypeDictionaryComponent} from './stage-type-dictionary/stage-type-dictionary.component';

const routes: Routes = [
  {path: '', component: DictionariesComponent},
  {path: 'stage-standard', component: StageStandardDictionaryComponent},
  {path: 'stage', component: StageDictionaryComponent},
  {path: 'stage-type', component: StageTypeDictionaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionaryRoutingModule {
}
