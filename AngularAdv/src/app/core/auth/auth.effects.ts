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
import {
  tap,
  map,
  switchMap,
  exhaust,
  exhaustMap,
  catchError
} from 'rxjs/operators';
import { LoginService } from 'src/app/login/login.service';
import { User } from 'src/app/login/user.model';
import { of } from 'rxjs';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private loginService: LoginService
  ) {}

  @Effect({ dispatch: false })
  login = this.actions$.pipe(
    ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
    map((action: ActionAuthLogin) => action.payload),
    exhaustMap(e => {
      return this.loginService.Auth(e).pipe(
        tap(() => {
          this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true }),
            this.router.navigate(['home']);
        }),
        catchError(err => of([]))
      );
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.loginService.logOut(),
        this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
    })
  );
}
