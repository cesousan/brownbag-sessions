import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
    data: Pizza[];
    loading: boolean;
    loaded: boolean;
    error: any;
}

const initialState: PizzaState = {
    data: [],
    loading: false,
    loaded: false,
    error: null
};

export function reducer(
    state = initialState,
    action: fromPizzas.PizzasAction
) {
    switch(action.type) {
        case fromPizzas.LOAD_PIZZA : {
            return {
                ...state,
                loading: true
            };
        }
        case fromPizzas.LOAD_PIZZA_SUCCESS : {
            return {
                ...state,
                data: action.payload,
                loading: false,
                loaded: true,
                error: null
            };
        }
        case fromPizzas.LOAD_PIZZA_FAIL : {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }
        // case fromPizzas.CREATE_PIZZA : {
        //     return {
        //         ...state,
        //         loading: true
        //     }
        // }
        // case fromPizzas.LOAD_PIZZA : {
        //     return {
        //         ...state,
        //         loading: true
        //     }
        // }
        // case fromPizzas.LOAD_PIZZA : {
        //     return {
        //         ...state,
        //         loading: true
        //     };
        // }
        default : {
            return state;
        }
    }
}
