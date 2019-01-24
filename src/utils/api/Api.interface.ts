/**
 * Api.interface.ts
 * Api interface.
 */
'use strict';

/**
 * Request interface.
 */
export interface RequestInterface<T> {
  promise: Promise<T>;
  cancel: Function;
}
