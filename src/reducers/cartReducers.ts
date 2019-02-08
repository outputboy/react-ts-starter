import { FetchCart } from '../actions/cartActions';
import { CartDataInterface } from '../components/cart/Cart.interface';
import { CartActionType } from '../types/ActionType';

export const initialState: { cart: CartDataInterface[] } = { cart: [] };

export const cartReducer = (state: { cart: CartDataInterface[] } = initialState, action: FetchCart) => {
  switch (action.type) {
    // Add a product to cart
    case CartActionType.FETCH_CART:
      return {
        ...state,
        cart: action.payload.cart,
      };
    //
    case CartActionType.FETCH_DELETE_CART_PRODUCT:
      return {
        ...state,
        cart: action.payload.cart,
      };
    default:
      return state;
  }
};
