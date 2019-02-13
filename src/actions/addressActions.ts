// Import the dependent modules
import { action } from 'typesafe-actions';

import { AddressActionType } from '../types/ActionType';
import { AddressValid } from '../utils/address/Address.interface';

export interface FetchAddress {
  type: AddressActionType;
  payload: { address: AddressValid };
}

export const fetchAddress = (payload: { address: AddressValid }) => action(AddressActionType.FETCH_ADDRESS, payload);
