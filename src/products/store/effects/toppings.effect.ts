import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { switchMap, map, catchError, startWith } from 'rxjs/operators';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services';

@Injectable()
export class ToppingsEffects {
  constructor(
    private toppingsService: fromServices.ToppingsService,
    private actions$: Actions
  ) {}

  @Effect()
  toppings$: Observable<Action> = this.actions$.pipe(
    ofType<toppingsActions.LoadToppings>(toppingsActions.LOAD_TOPPINGS),
    startWith(new toppingsActions.LoadToppings()),
    switchMap(() => this.toppingsService.getToppings().pipe(
      map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
      catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
    ))
  )
}
