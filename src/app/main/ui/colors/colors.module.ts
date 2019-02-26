import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatIconModule, MatTabsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ColorsComponent } from 'app/main/ui/colors/colors.component';

const routes: Routes = [
    {
        path     : 'colors',
        component: ColorsComponent
    }
];

@NgModule({
    declarations: [
        ColorsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTabsModule,

        FuseSharedModule
    ]
})
export class UIColorsModule
{
}
