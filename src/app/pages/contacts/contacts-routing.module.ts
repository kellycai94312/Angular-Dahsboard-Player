import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component';

const routes: Routes = [{
  path: '', component: ContactsComponent,
  children: [
    {path: '', redirectTo: 'person', pathMatch: 'full'},
    {path: 'person', loadChildren: '../contacts/persons/persons.module#PersonsModule'},
    {path: 'group', loadChildren: '../contacts/groups/groups.module#GroupsModule'},
    {path: 'place', loadChildren: '../contacts/places/places.module#PlacesModule'},
    {path: 'event', loadChildren: '../contacts/events/events.module#EventsModule'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {
}
