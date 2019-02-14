export enum ActionType {
  SnackbarPop = 'SNACKBAR/POP',
  SnackbarPush = 'SNACKBAR/PUSH',
  FETCH_LOGIN = 'FETCH_LOGIN',
}

export enum CartActionType {
  FETCH_CART = 'FETCH_CART',
  FETCH_UPDATE_CART_QTY = 'FETCH_UPDATE_CART_QTY',
  FETCH_DELETE_CART_PRODUCT = 'FETCH_DELETE_CART_PRODUCT',
}

export enum AddressActionType {
  FETCH_ADDRESS = 'FETCH_ADDRESS',
}

export enum PaymentInfoActionType {
  FETCH_PAYMENT_INFO = 'FETCH_PAYMENT_INFO',
}
