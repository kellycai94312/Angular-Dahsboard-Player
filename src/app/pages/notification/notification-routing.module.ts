import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotificationsComponent} from './notifications/notifications.component';
import {AllNotificationsComponent} from './notifications/all-notifications/all-notifications.component';
import {ChangeNotificationsComponent} from './notifications/change-notifications/change-notifications.component';

const routes: Routes = [
  {
    path: '', component: NotificationsComponent,
    children: [
      {path: '', redirectTo: 'all'},
      {path: 'all', component: AllNotificationsComponent},
      {path: 'change', component: ChangeNotificationsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule {
}
