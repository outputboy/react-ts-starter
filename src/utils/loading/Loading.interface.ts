/**
 * Loading.interface.ts
 * Interfaces for the loading component.
 */
'use strict';

// Import the dependent enumerators.
import { PlaceholderType } from './Loading.enum';

/**
 * Loading properties interface.
 */
export interface LoadingProps {
  placeholder?: PlaceholderType;
}

/**
 * Loading properties state.
 */
export interface LoadingState {
  placeholder: PlaceholderType;
}
