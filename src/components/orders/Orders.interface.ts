/**
 * Interfaces for the orders component.
 */
'use strict';
import { PagerData } from '../../utils/pager/Pager.interface';
import { LoginInterface } from '../login/Login.interface';

/**
 * Order data properties interface.
 */
export interface OrdersDataInterface {
  order_id: string;
  placed: string;
  total_price__number: string;
  state: string;
  uid: string;
  order_items: string;
  field_order_serial_number: string;
}

/*
 * Orders field with rows and pager
 */
export interface OrdersFieldInterface {
  rows: Array<OrdersDataInterface>;
  pager: PagerData;
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
  ordersData: OrdersFieldInterface;
  paymentTotal: number;
  orderId: Array<string>;
}
