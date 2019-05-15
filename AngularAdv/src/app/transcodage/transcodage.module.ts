import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranscodageRoutingModule } from './transcodage-routing.module';
import { TranscodageContainerComponent } from './transcodage-container/transcodage-container.component';
import { StoreFeatureModule, StoreModule } from '@ngrx/store';
import { reducer } from './store/transcodage.reducer';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [TranscodageContainerComponent],
  imports: [
      AngularMaterialModule,
    TranscodageRoutingModule,
    StoreModule.forFeature('trascodage',reducer)
  ]
})
export class TranscodageModule { }
