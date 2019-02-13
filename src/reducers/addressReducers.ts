import { FetchAddress } from '../actions/addressActions';
import { AddressActionType } from '../types/ActionType';
import { StateType } from '../utils/address/Address.enum';
import { AddressValid } from '../utils/address/Address.interface';

export const initialState: { address: AddressValid } = {
  address: {
    field_email: '',
    field_first_name: '',
    field_last_name: '',
    field_address: '',
    field_suburb: '',
    field_state: StateType.NONE,
    field_postcode: 0,
    field_telephone: 0,
    form_valid: false,
  },
};

export const addressReducer = (state: { address: AddressValid } = initialState, action: FetchAddress) => {
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
