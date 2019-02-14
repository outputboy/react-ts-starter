/**
 * Interfaces for the orders component.
 */
'use strict';
import { AddressValid } from '../../utils/address/Address.interface';
import { CartDataInterface } from '../cart/Cart.interface';
import { LoginInterface } from '../login/Login.interface';

/**
 * Checkout properties interface.
 */
export interface CheckoutPropsInterface {
  loginDetails?: LoginInterface;
  address?: AddressValid;
  cart?: CartDataInterface[];
  paymentInfo?: PaymentInfoInterface;
  fetchPaymentInfo?: (payload: { paymentInfo: PaymentInfoInterface }) => void;
}

/**
 * Checkout state interface.
 */
export interface CheckoutStateInterface {
  paymentTotal: number;
}

/**
 * Individal product order item interface post to backend.
 */
export interface IndividualProductOrderInterface {
  type: string;
  title: string;
  quantity: number;
  purchased_entity: {
    sku: string;
  };
}

/**
 * Success page props interface.
 */
export interface SuccessPropsInterface {
  loginDetails?: LoginInterface;
  paymentInfo?: PaymentInfoInterface;
}

/**
 * Success page state interface.
 */
export interface SuccessStateInterface {
  paymentId?: string;
}

/**
 * Payment capture interface.
 */
export interface PaymentInfoInterface {
  orderId: string;
  paymentId: string;
}
