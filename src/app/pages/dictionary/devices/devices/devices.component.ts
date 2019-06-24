import {Component} from '@angular/core';
import {Device} from '../../../../data/remote/model/device/device';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent {

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute) {
  }

  public async onClickItem(item: Device): Promise<void> {
    await this._router.navigate([item.id], {relativeTo: this._activatedRoute});
  }

}
