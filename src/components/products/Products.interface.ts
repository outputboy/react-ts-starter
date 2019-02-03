/**
 * Interfaces for the products component.
 */
'use strict';

import { PagerData } from '../../utils/pager/Pager.interface';
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
  pager: PagerData;
}

/**
 * Products properties interface.
 */
export interface ProductsPropsInterface {
  loginDetails?: LoginInterface;
}

/**
 * Products state interface.
 */
export interface ProductsStateInterface {
  productsFields: ProductsFieldInterface;
}

/**
 * Single product props interface.
 */
export interface ProductSinglePropsInterface {
  product: ProductsDataInterface;
  username: string;
}

/**
 * Single product state interface.
 */
export interface ProductSingleStateInterface {
  value: string;
}
