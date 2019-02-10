/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import Select from 'react-select';

// Import the dependent components.
import Input from '../form/Input';

// Import the dependent interfaces.
import { StateType, stateOptions } from './Address.enum';
import { AddressPropsInterface, AddressStateInterface, FormEventTypeInterface } from './Address.interface';

class Address extends React.Component<AddressPropsInterface, AddressStateInterface> {
  constructor(props: AddressPropsInterface) {
    super(props);

    this.state = {
      field_first_name: '',
      field_last_name: '',
      field_address: '',
      field_suburb: '',
      field_state: StateType.NONE,
      field_postcode: 0,
      field_telephone: 0,
      formErrors: {
        field_first_name: '',
        field_last_name: '',
        field_address: '',
        field_suburb: '',
        field_state: '',
        field_postcode: '',
        field_telephone: '',
      },
      postcodeValid: false,
      notEmptyValid: false,
      formValid: false,
    };
  }

  /**
   *
   * Handle form element change behaviour.
   * Also validate form input and select.
   *
   */
  handleChange = (event: FormEventTypeInterface) => {
    const elementName: string = event.currentTarget.name;
    const elementValue: string = event.currentTarget.value;

    this.setState(
      (currentState: AddressStateInterface) => ({
        ...currentState,
        [elementName]: elementValue,
      }),
      () => {
        this.validateField(elementName, elementValue);
      },
    );
  };

  /**
   *
   * Validate form fields.
   *
   */
  validateField = (fieldName: string, value: string) => {
    const fieldValidationErrors = this.state.formErrors;
    let postcodeValid = this.state.postcodeValid;
    let notEmptyValid = this.state.notEmptyValid;

    // Check if fields are valid
    switch (fieldName) {
      case 'field_first_name':
      case 'field_last_name':
      case 'field_address':
      case 'field_suburb':
        notEmptyValid = value.length > 0;
        fieldValidationErrors.field_address = notEmptyValid ? '' : 'Please input value';
        break;
      case 'field_state':
        notEmptyValid = value.length > 0;
        fieldValidationErrors.field_state = notEmptyValid ? '' : 'Please select a subject';
        break;
      case 'field_postcode':
        postcodeValid = value.match(/\d{4}$/) ? true : false;
        fieldValidationErrors.field_postcode = postcodeValid ? '' : 'E-Mail is invalid';
        break;
      case 'field_telephone':
        notEmptyValid = value.length > 0;
        fieldValidationErrors.field_telephone = notEmptyValid ? '' : 'Please leave your message';
        break;
      default:
        break;
    }

    // Set error messages
    this.setState(
      {
        postcodeValid,
        notEmptyValid,
        formErrors: fieldValidationErrors,
      },
      this.validateForm,
    );
  };

  // Validate form
  validateForm = () => {
    this.setState({
      formValid: this.state.postcodeValid && this.state.notEmptyValid,
    });
  };

  // Has error class
  errorClass(error: string) {
    return error.length === 0 ? '' : 'error';
  }

  // render all product card
  render() {
    console.log(this.state);

    return (
      <div className="container">
        <div className="row">
          <div className="col m9 s12">
            <div className="block--cart collection">
              <Input
                type={'text'}
                title={'First Name'}
                name={'field_first_name'}
                value={this.state.field_first_name}
                placeholder={'First Name(Required)'}
                handleChange={this.handleChange}
                handleFocusOut={this.handleChange}
                hasError={this.errorClass(this.state.formErrors.field_first_name)}
              />
              <div className="block block-errors">{this.state.formErrors.field_first_name}</div>

              <Input
                type={'text'}
                title={'Last Name'}
                name={'field_last_name'}
                value={this.state.field_last_name}
                placeholder={'Last Name(Required)'}
                handleChange={this.handleChange}
                handleFocusOut={this.handleChange}
                hasError={this.errorClass(this.state.formErrors.field_last_name)}
              />

              <div className="block block-errors">{this.state.formErrors.field_last_name}</div>
              <Input
                type={'text'}
                title={'Address'}
                name={'field_address'}
                value={this.state.field_address}
                placeholder={'First Name(Required)'}
                handleChange={this.handleChange}
                handleFocusOut={this.handleChange}
                hasError={this.errorClass(this.state.formErrors.field_address)}
              />

              <div className="block block-errors">{this.state.formErrors.field_address}</div>
              <Input
                type={'text'}
                title={'Suburb'}
                name={'field_suburb'}
                value={this.state.field_suburb}
                placeholder={'Suburb(Required)'}
                handleChange={this.handleChange}
                handleFocusOut={this.handleChange}
                hasError={this.errorClass(this.state.formErrors.field_suburb)}
              />

              <Select
                options={stateOptions}
                onChange={(value: any) => {
                  this.setState({ field_state: value['value'] });
                }}
              />
              <div className="block block-errors">{this.state.formErrors.field_state}</div>
              <Input
                type={'text'}
                title={'Postcode'}
                name={'field_postcode'}
                value={this.state.field_postcode}
                placeholder={'Postcode(Required)'}
                handleChange={this.handleChange}
                handleFocusOut={this.handleChange}
                hasError={this.errorClass(this.state.formErrors.field_postcode)}
              />
              <div className="block block-errors">{this.state.formErrors.field_postcode}</div>
              <Input
                type={'text'}
                title={'Telephone'}
                name={'field_telephone'}
                value={this.state.field_telephone}
                placeholder={'Telephone(Required)'}
                handleChange={this.handleChange}
                handleFocusOut={this.handleChange}
                hasError={this.errorClass(this.state.formErrors.field_telephone)}
              />
              <div className="block block-errors">{this.state.formErrors.field_telephone}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Address;
