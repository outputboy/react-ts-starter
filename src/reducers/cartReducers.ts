import { FetchCart, FetchCartData } from '../actions/cartActions';
import { CartActionType } from '../types/ActionType';

export const initialState: FetchCartData = { cart: [] };

export const cartReducer = (state: FetchCartData = initialState, action: FetchCart) => {
  switch (action.type) {
    // Add a product to cart
    case CartActionType.FETCH_CART:
      return {
        ...state,
        cart: action.payload.cart,
      };
    //
    case CartActionType.FETCH_DELETE_CART_PRODUCT:
      if (action.payload.index) {
        return {
          ...state,
          cart: [...state.cart.slice(0, action.payload.index), ...state.cart.slice(action.payload.index + 1)],
        };
      }
      break;
    default:
      return state;
  }
};
