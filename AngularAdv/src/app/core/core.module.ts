import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { reducers, metaReducers } from './core.state';
import { environment } from 'src/environments/environment';
import { AuthEffects } from './auth/auth.effects';
import { LocalStorageService } from './local-storage/local-storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrefixApiInterceptor } from './helpers/prefix-api.interceptor';
import { TokenInterceptor } from './helpers/token.interceptor';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects]),

    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Angular NgRx Material '
        })
  ],
  providers: [
    LocalStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: PrefixApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
