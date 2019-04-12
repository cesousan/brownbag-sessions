import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loading: boolean;
  loaded: boolean;
  error: any;
}


export const mapPizzasToEntities = (
  array: Pizza[],
  initialEntities = {}
): { [id: number]: Pizza } => array.reduce((acc, curr) => ({
  ...acc,
  [curr.id]: curr
}), initialEntities);

const initialState: PizzaState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction) {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZA: {
      return {
        ...state,
        loading: true
      };
    }
    case fromPizzas.LOAD_PIZZA_SUCCESS: {
      return {
        ...state,
        entities: mapPizzasToEntities(action.payload, state.entities),
        loading: false,
        loaded: true,
        error: null
      };
    }
    case fromPizzas.LOAD_PIZZA_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case fromPizzas.CREATE_PIZZA: {
      return {
        ...state,
        loading: true
      };
    }
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload
        }
      };
    }
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getLoading = (state: PizzaState) => state.loading;
export const getLoaded = (state: PizzaState) => state.loaded;
export const getEntities = (state: PizzaState) => state.entities;
export const getError = (state: PizzaState) => state.error;
export const getEntitiesAsArray = (state: PizzaState): Array<Pizza> => Object.keys(state.entities).map(key => state.entities[key]);
