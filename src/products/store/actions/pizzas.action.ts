import { Action } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

export const LOAD_PIZZA = '[Product] Load Pizza';
export const LOAD_PIZZA_SUCCESS = '[Product] Load Pizza Success';
export const LOAD_PIZZA_FAIL = '[Product] Load Pizza Fail';

export const CREATE_PIZZA = '[Product] Create Pizza';
export const CREATE_PIZZA_SUCCESS = '[Product] Create Pizza Success';
export const CREATE_PIZZA_FAIL = '[Product] Create Pizza Fail';

export class LoadPizza implements Action {
  readonly type = LOAD_PIZZA;
}
export class LoadPizzaSuccess implements Action {
  readonly type = LOAD_PIZZA_SUCCESS;
  constructor(public payload: Pizza[]){}
}
export class LoadPizzaFail implements Action {
  readonly type = LOAD_PIZZA_FAIL;
  constructor(public payload: any){}
}

// export class CreatePizza implements Action {
//   readonly type = CREATE_PIZZA;
// }

// export class CreatePizzaSuccess implements Action {
//   readonly type = CREATE_PIZZA_SUCCESS;
//   constructor(public payload: Pizza){}
// }
// export class CreatePizzaFail implements Action {
//   readonly type = CREATE_PIZZA_FAIL;
//   constructor(public payload: any){}
// }

// action types
export type PizzasAction = 
  LoadPizza
  | LoadPizzaSuccess
  | LoadPizzaFail
  // | CreatePizza
  // | CreatePizzaSuccess
  // | CreatePizzaFail;
