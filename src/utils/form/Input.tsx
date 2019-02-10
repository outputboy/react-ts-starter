/**
 * Input.tsx
 * Input JSX component.
 */

// Import the dependent modules.
import * as React from 'react';

// Import the dependent interfaces.
import { InputProps } from './Input.interface';

const Input: React.SFC<InputProps> = (props: InputProps) => {
  return (
    <div className={`form-group ${props.hasError}`}>
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <input
        className="form-input"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        onBlur={props.handleFocusOut}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
