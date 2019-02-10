/**
 * Interfaces for the address component.
 */
'use strict';

import { StateType } from './Address.enum';

/**
 * Address interface.
 */
export interface AddressInterface {
  field_first_name: string;
  field_last_name: string;
  field_address: string;
  field_suburb: string;
  field_state: StateType;
  field_postcode: number;
  field_telephone: number;
}

/**
 * Address properties interface.
 */
export interface AddressPropsInterface {}

/**
 * Address form component error interface.
 */
interface ErrorInterface {
  field_first_name: string;
  field_last_name: string;
  field_address: string;
  field_suburb: string;
  field_state: string;
  field_postcode: string;
  field_telephone: string;
}

/**
 * Address properties interface.
 */
export interface AddressStateInterface extends AddressInterface {
  formErrors: ErrorInterface;
  postcodeValid: boolean;
  notEmptyValid: boolean;
  formValid: boolean;
}

/**
 * Address properties interface.
 */
export type FormEventTypeInterface = React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>;
