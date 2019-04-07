import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { map, catchError, mergeMap, startWith } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(
    private pizzaService: fromServices.PizzasService,
    private actions$: Actions
  ) {}

  @Effect()
  loadPizzasEffect$: Observable<Action> = this.actions$.pipe(
    ofType<pizzaActions.LoadPizza>(
      pizzaActions.LOAD_PIZZA
    ),
    startWith(new pizzaActions.LoadPizza()),
    mergeMap(() => this.pizzaService.getPizzas().pipe(
      map(pizzas => new pizzaActions.LoadPizzaSuccess(pizzas)),
      catchError(error => of(new pizzaActions.LoadPizzaFail(error)))
    ))
  );
}
