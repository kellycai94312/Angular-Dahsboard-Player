import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DevicesComponent} from './devices/devices.component';

const routes: Routes = [
  {path: '', component: DevicesComponent},
  {path: ':id', loadChildren: './device/device.module#DeviceModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule {
}
