/**
 * Interfaces for the cart component.
 */
'use strict';

import { ProductsDataInterface } from '../products/Products.interface';

export interface CartDataInterface extends ProductsDataInterface {
  singleQty: number;
  singleTotal: number;
}

/**
 * Shopping cart properties interface.
 */
export interface CartPropsInterface {
  cart: CartDataInterface[];
  deleteCartProduct?: (payload: { cart: CartDataInterface[] }) => void;
}

/**
 * Shopping cart properties interface.
 */
export interface CartStateInterface {
  shoppingCart: CartDataInterface[];
}

/**
 * Shopping cart row properties interface.
 */
export interface CartRowPropsInterface {
  product: ProductsDataInterface;
}
