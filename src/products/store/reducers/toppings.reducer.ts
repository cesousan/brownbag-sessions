import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/pizza.model';

export interface ToppingsState {
    data: Topping[];
    loading: boolean;
    loaded: boolean;
    error: any;
}

const initialState: ToppingsState = {
    data: [],
    loading: false,
    loaded: false,
    error: null
};

export function reducer(
    state = initialState,
    action: fromToppings.ToppingsAction
) {
    switch(action.type) {
        case fromToppings.LOAD_TOPPINGS : {
            return {
                ...state,
                loading: true
            };
        }
        case fromToppings.LOAD_TOPPINGS_SUCCESS : {
            return {
                ...state,
                data: action.payload,
                loading: false,
                loaded: true,
                error: null
            };
        }
        case fromToppings.LOAD_TOPPINGS_FAIL : {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }
        default : {
            return state;
        }
    }
}
