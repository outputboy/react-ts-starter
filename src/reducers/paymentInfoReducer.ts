// Payment info reducer including orderID and paymentID to capture payment
import { FetchPaymentInfo } from '../actions/paymentInfoActions';
import { PaymentInfoInterface } from '../components/checkout/Checkout.interface';
import { PaymentInfoActionType } from '../types/ActionType';

export const initialState: { paymentInfo: PaymentInfoInterface } = {
  paymentInfo: {
    orderId: '',
    paymentId: '',
  },
};

export const paymentInfoReducer = (
  state: { paymentInfo: PaymentInfoInterface } = initialState,
  action: FetchPaymentInfo,
) => {
  switch (action.type) {
    // Add a product to cart
    case PaymentInfoActionType.FETCH_PAYMENT_INFO:
      return {
        ...state,
        paymentInfo: action.payload.paymentInfo,
      };
    default:
      return state;
  }
};
