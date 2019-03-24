/**
 * Interfaces for the orders component.
 */
'use strict';
import { PagerProps } from '../../utils/pager/Pager.interface';
import { LoginInterface } from '../login/Login.interface';

/**
 * Order data properties interface.
 */
export interface OrdersDataInterface {
  order_number: string;
  placed: string;
  total_price__number: string;
  state: string;
  order_items: string;
  order_id: string;
}

/*
 * Orders field with rows and pager
 */
export interface OrdersFieldInterface {
  rows: Array<OrdersDataInterface>;
  pager: PagerProps;
}

/**
 * Orders properties interface.
 */
export interface OrdersPropsInterface {
  loginDetails?: LoginInterface;
}

/**
 * Orders state interface.
 */
export interface OrdersStateInterface {
  ordersFields: OrdersFieldInterface;
  paymentTotal: number;
  submitOrders: string[];
}
