// Import the dependent modules
import { action } from 'typesafe-actions';

import { AddressActionType } from '../types/ActionType';
import { AddressInterface } from '../utils/address/Address.interface';

export interface FetchAddress {
  type: AddressActionType;
  payload: { address: AddressInterface };
}

export const fetchAddress = (payload: { address: AddressInterface }) =>
  action(AddressActionType.FETCH_ADDRESS, payload);
