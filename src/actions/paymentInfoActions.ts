// Import the dependent modules
import { action } from 'typesafe-actions';

import { PaymentInfoInterface } from '../components/checkout/Checkout.interface';
import { PaymentInfoActionType } from '../types/ActionType';

export interface FetchPaymentInfo {
  type: PaymentInfoActionType;
  payload: { paymentInfo: PaymentInfoInterface };
}

export const fetchPaymentInfo = (payload: { paymentInfo: PaymentInfoInterface }) =>
  action(PaymentInfoActionType.FETCH_PAYMENT_INFO, payload);
