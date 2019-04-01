import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Router } from '@angular/router';
import {
  ActionAuthLogin,
  AuthActionTypes,
  ActionAuthLogout
} from './auth.actions';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/login/login.service';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  login = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    tap(() => {
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true }),
        this.router.navigate(['home']);
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.router.navigateByUrl('/login');
      this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
    })
  );
}
