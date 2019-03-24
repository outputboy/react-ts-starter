/**
 * Interfaces for the products component.
 */
'use strict';

import { RouteComponentProps } from 'react-router';
import { PagerProps } from '../../utils/pager/Pager.interface';
import { CartDataInterface } from '.././cart/Cart.interface';
import { LoginInterface } from '../login/Login.interface';

/**
 * Single products properties interface.
 */
export interface ProductsDataInterface {
  title: string;
  sku: string;
  price__number: string;
  field_stock: string;
  variation_id: string;
}

/*
 * Products field with rows and pager
 */
export interface ProductsFieldInterface {
  rows: ProductsDataInterface[];
  pager: PagerProps;
}

/**
 * Products properties interface.
 */
export interface ProductsPropsInterface extends RouteComponentProps {
  loginDetails?: LoginInterface;
}

/**
 * Products state interface.
 */
export interface ProductsStateInterface {
  productsFields: ProductsFieldInterface;
  errors?: Error;
}

/**
 * Single product props interface.
 */
export interface ProductSinglePropsInterface {
  cart: Array<CartDataInterface>;
  fetchCart?: (payload: { cart: CartDataInterface[] }) => void;
  product: ProductsDataInterface;
  username: string;
}

/**
 * Single product state interface.
 */
export interface ProductSingleStateInterface {}

/**
 * Product search props interface.
 */
export interface ProductsSearchPropsInterface {
  fetchProducts: Function;
}

/**
 * Product search state interface.
 */
export interface ProductsSearchStateInterface {
  keywords: string;
}
