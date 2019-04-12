import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

// feature state
export interface ProductsState {
    pizzas: fromPizzas.PizzaState;
    toppings: fromToppings.ToppingsState;
}

// reducers
export const reducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzas.reducer,
    toppings: fromToppings.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

// pizza state
export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);
// pizza state selectors
export const getAllPizzas = createSelector(
  getPizzaState,
  fromPizzas.getEntitiesAsArray
);

export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getLoading
);

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getLoaded
);

export const getPizzasError = createSelector(
  getPizzaState,
  fromPizzas.getError
);

// topings state
export const getToppingsState = createSelector(
  getProductsState,
  (state: ProductsState) => state.toppings
);

// toppings state selectors
export const getAllToppings = createSelector(
  getToppingsState,
  fromToppings.getData
);

export const getToppingsLoading = createSelector(
  getToppingsState,
  fromToppings.getLoading
);

export const getToppingsLoaded = createSelector(
  getToppingsState,
  fromToppings.getLoaded
);

export const getToppingsError = createSelector(
  getToppingsState,
  fromToppings.getError
);
