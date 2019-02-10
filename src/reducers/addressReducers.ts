import { FetchAddress } from '../actions/addressActions';
import { AddressActionType } from '../types/ActionType';
import { StateType } from '../utils/address/Address.enum';
import { AddressInterface } from '../utils/address/Address.interface';

export const initialState: { address: AddressInterface } = {
  address: {
    field_first_name: '',
    field_last_name: '',
    field_address: '',
    field_suburb: '',
    field_state: StateType.NONE,
    field_postcode: 0,
    field_telephone: 0,
  },
};

export const cartReducer = (state: { address: AddressInterface } = initialState, action: FetchAddress) => {
  switch (action.type) {
    // Add a product to cart
    case AddressActionType.FETCH_ADDRESS:
      return {
        ...state,
        address: action.payload.address,
      };
    default:
      return state;
  }
};
