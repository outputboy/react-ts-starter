/**
 * Address.enum
 * Enumerators for Address requests.
 */

export enum AddressType {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  ADDRESS = 'ADDRESS',
  SUBURB = 'suburb',
  STATE = 'state',
  POSTCODE = 'postcode',
  TELEPHONE = 'telephone',
}

export enum StateType {
  ACT = 'ACT',
  NONE = '',
  NSW = 'NSW',
  NT = 'NT',
  QLD = 'QLD',
  TAS = 'TAS',
  VIC = 'VIC',
  SA = 'SA',
  WA = 'WA',
}

// Mock state selection
export const stateOptions = [
  { value: StateType.ACT, label: StateType.ACT },
  { value: StateType.NSW, label: StateType.NSW },
  { value: StateType.NT, label: StateType.NT },
  { value: StateType.QLD, label: StateType.QLD },
  { value: StateType.TAS, label: StateType.TAS },
  { value: StateType.VIC, label: StateType.VIC },
  { value: StateType.SA, label: StateType.SA },
  { value: StateType.WA, label: StateType.WA },
];
