import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { GroupFinanceComponent } from 'app/pages/group/group-page/page/group-finance/group-finance/group-finance.component';


const routes: Routes = [
  {path: '', component: GroupFinanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupFinanceRoutingModule {
}
