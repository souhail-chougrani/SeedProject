import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranscodageContainerComponent } from './transcodage-container/transcodage-container.component';

const routes: Routes = [
  {path:'',component:TranscodageContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranscodageRoutingModule { }
