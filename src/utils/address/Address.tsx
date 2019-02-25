/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Dispatch, bindActionCreators } from 'redux';

// Import the dependent components.
import Typography from '@material-ui/core/Typography';
import { fetchAddress } from '../../actions/addressActions';
import Input from '../form/Input';

// Import the dependent interfaces.
import { StateType, stateOptions } from './Address.enum';
import { AddressPropsInterface, AddressStateInterface, FormEventTypeInterface } from './Address.interface';

class Address extends React.Component<AddressPropsInterface, AddressStateInterface> {
  constructor(props: AddressPropsInterface) {
    super(props);

    this.state = {
      field_email: '',
      field_first_name: '',
      field_last_name: '',
      field_address: '',
      field_suburb: '',
      field_state: StateType.NONE,
      field_postcode: 0,
      field_telephone: 0,
      formErrors: {
        field_email: '',
        field_first_name: '',
        field_last_name: '',
        field_address: '',
        field_suburb: '',
        field_state: '',
        field_postcode: '',
        field_telephone: '',
      },
      postcodeValid: false,
      emailValid: false,
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
  handleChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const elementName: string = event.currentTarget.name;
    const elementValue: string = event.currentTarget.value;

    this.setState(
      (currentState: AddressStateInterface) => ({
        ...currentState,
        [elementName]: elementValue,
      }),
      () => {
        this.validateField(elementName, elementValue);
        // Update redux store with address form result
        if (this.props.fetchAddress) {
          this.props.fetchAddress({
            address: {
              field_email: this.state.field_email,
              field_first_name: this.state.field_first_name,
              field_last_name: this.state.field_last_name,
              field_address: this.state.field_address,
              field_suburb: this.state.field_suburb,
              field_state: this.state.field_state,
              field_postcode: this.state.field_postcode,
              field_telephone: this.state.field_telephone,
              form_valid: this.state.formValid,
            },
          });
        }
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
    let emailValid = this.state.emailValid;
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
      case 'field_email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
        fieldValidationErrors.field_email = emailValid ? '' : 'E-Mail is invalid';
        break;
      case 'field_postcode':
        postcodeValid = value.match(/\d{4}$/) ? true : false;
        fieldValidationErrors.field_postcode = postcodeValid ? '' : 'Postcode is invalid';
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
        emailValid,
        notEmptyValid,
        formErrors: fieldValidationErrors,
      },
      this.validateForm,
    );
  };

  // Validate form
  validateForm = () => {
    this.setState({
      formValid: this.state.postcodeValid && this.state.notEmptyValid && this.state.emailValid,
    });
  };

  // Has error class
  errorClass(error: string) {
    return error.length === 0 ? '' : 'error';
  }

  // render all product card
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m9 s12">
            <div className="block--cart collection">
              <Input
                type={'text'}
                title={'eMail Address'}
                name={'field_email'}
                value={this.state.field_email}
                placeholder={'email(Required)'}
                handleChange={this.handleChange}
                handleFocusOut={this.handleChange}
                hasError={this.errorClass(this.state.formErrors.field_email)}
              />{' '}
              <Typography color={'error'}>{this.state.formErrors.field_email}</Typography>
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
              <Typography color={'error'}>{this.state.formErrors.field_first_name}</Typography>
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
              <Typography color={'error'}>{this.state.formErrors.field_last_name}</Typography>
              <Input
                type={'text'}
                title={'Address'}
                name={'field_address'}
                value={this.state.field_address}
                placeholder={'Street Address(Required)'}
                handleChange={this.handleChange}
                handleFocusOut={this.handleChange}
                hasError={this.errorClass(this.state.formErrors.field_address)}
              />
              <Typography color={'error'}>{this.state.formErrors.field_address}</Typography>
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
                  this.setState({ field_state: value['value'] }, () => {
                    // Update redux store with address state result
                    if (this.props.fetchAddress) {
                      this.props.fetchAddress({
                        address: {
                          field_email: this.state.field_email,
                          field_first_name: this.state.field_first_name,
                          field_last_name: this.state.field_last_name,
                          field_address: this.state.field_address,
                          field_suburb: this.state.field_suburb,
                          field_state: this.state.field_state,
                          field_postcode: this.state.field_postcode,
                          field_telephone: this.state.field_telephone,
                          form_valid: this.state.formValid,
                        },
                      });
                    }
                  });
                }}
              />
              <Typography color={'error'}>{this.state.formErrors.field_state}</Typography>
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
              <Typography color={'error'}>{this.state.formErrors.field_postcode}</Typography>
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
              <Typography color={'error'}>{this.state.formErrors.field_telephone}</Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store: any) => {
  return { address: store.address.address };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ fetchAddress }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Address);
