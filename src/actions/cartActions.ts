// Import the dependent modules
import { action } from 'typesafe-actions';

import { CartDataInterface } from '../components/cart/Cart.interface';
import { CartActionType } from '../types/ActionType';

export interface FetchCart {
  type: CartActionType;
  payload: { cart: CartDataInterface[] };
}

export const fetchCart = (payload: { cart: CartDataInterface[] }) => action(CartActionType.FETCH_CART, payload);
export const deleteCartProduct = (payload: { cart: CartDataInterface[] }) =>
  action(CartActionType.FETCH_DELETE_CART_PRODUCT, payload);
