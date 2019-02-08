// Import the dependent modules
import { action } from 'typesafe-actions';

import { ProductsDataInterface } from '../components/products/Products.interface';
import { CartActionType } from '../types/ActionType';

export interface FetchCartData {
  cart: ProductsDataInterface[];
  index?: number;
}

export interface FetchCart {
  type: CartActionType;
  payload: FetchCartData;
}

export const fetchCart = (payload: FetchCartData) => action(CartActionType.FETCH_CART, payload);
export const deleteCart = (index: number) => action(CartActionType.FETCH_DELETE_CART, index);
