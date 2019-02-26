/**
 * Input.tsx
 * Input JSX component.
 */

// Import the dependent modules.
import * as React from 'react';

import TextField from '@material-ui/core/TextField';

// Import the dependent interfaces.
import { InputProps } from './Input.interface';

const InputComponent: React.SFC<InputProps> = (props: InputProps) => {
  return (
    <TextField
      className="form-input"
      id={props.name}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.handleChange}
      onBlur={props.handleFocusOut}
      placeholder={props.placeholder}
      error={props.hasError.length === 0 ? false : true}
      label={props.label}
      style={{ width: '100%', padding: '15px 0' }}
    />
  );
};

export default InputComponent;
