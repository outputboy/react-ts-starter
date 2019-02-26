/**
 * Input.interface.tsx
 * Input interfaces.
 */
'use strict';
// Import the dependent modules.
import * as React from 'react';

/**
 * Input interface.
 */
export interface InputProps {
  type: string;
  title: string;
  name: string;
  value: string | number;
  placeholder: string;
  label: string;
  handleChange: (event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleFocusOut: (event: React.FormEvent<HTMLInputElement>) => void;
  hasError: string;
}
