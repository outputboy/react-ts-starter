/**
 * Interfaces for the products component.
 */
'use strict';

import { PagerData } from '../../utils/pager/Pager.interface';

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
export interface ProductsPropsInterface {}

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
}

/**
 * Single product state interface.
 */
export interface ProductSingleStateInterface {
  value: string;
  copied: boolean;
}

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
