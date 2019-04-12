import * as fromToppings from '../actions/toppings.action';

export interface ToppingsState {
    data: string[];
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

export const getLoading = (state: ToppingsState) => state.loading;
export const getLoaded = (state: ToppingsState) => state.loaded;
export const getData = (state: ToppingsState) => state.data;
export const getError = (state: ToppingsState) => state.error;
