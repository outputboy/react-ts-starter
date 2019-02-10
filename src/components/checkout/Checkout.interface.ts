/**
 * Interfaces for the orders component.
 */
'use strict';
import { LoginInterface } from '../login/Login.interface';

/**
 * Checkout properties interface.
 */
export interface CheckoutPropsInterface {
  loginDetails?: LoginInterface;
}

/**
 * Checkout state interface.
 */
export interface CheckoutStateInterface {
  paymentTotal: number;
}

/**
 * Success page props interface.
 */
export interface SuccessPropsInterface {}

/**
 * Success page state interface.
 */
export interface SuccessStateInterface {
  paymentId?: string;
}
