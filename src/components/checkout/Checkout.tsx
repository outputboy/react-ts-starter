/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { fetchPaymentInfo } from '../../actions/paymentInfoActions';

// Import the dependent components
import Address from '../../utils/address/Address';
import { RequestType } from '../../utils/api/Api.enum';
import Cart from '../cart/Cart';

// Import the dependent interfaces
import { AddressValid } from '../../utils/address/Address.interface';
import { CartDataInterface } from '../cart/Cart.interface';
import { CheckoutPropsInterface, CheckoutStateInterface, IndividualProductOrderInterface } from './Checkout.interface';
const base64 = require('base-64');

// const loginDetails = `${this.props.loginDetails.username}:${this.props.loginDetails.password}`;
const loginDetails = '306380373:123456';

class Checkout extends React.Component<CheckoutPropsInterface, CheckoutStateInterface> {
  constructor(props: CheckoutPropsInterface) {
    super(props);
  }

  // import { APIModel } from '../../utils/api/Api.model';
  // fetch products data
  submitOrder() {
    if (this.props.loginDetails) {
      const myHeaders = new Headers();
      const encodeLogin = `Basic ${base64.encode(loginDetails)}`;

      const customerInfo: AddressValid | undefined = this.props.address;

      const orderItems: IndividualProductOrderInterface[] = [];

      if (this.props.cart) {
        this.props.cart.map((cartItem: CartDataInterface, key: number) => {
          orderItems.push({
            type: 'default',
            title: cartItem.title,
            quantity: cartItem.singleQty,
            purchased_entity: {
              sku: cartItem.sku,
            },
          });
        });
      } else {
        alert('sorry empty cart');
      }

      // render all order items
      if (customerInfo && this.props.cart) {
        // Check if address form is filled
        if (customerInfo.form_valid) {
          const myBody = {
            order: {
              type: 'default',
              email: customerInfo.field_email,
              store: 1, // optional. Store ID. Defaults to the default store in the system.
              field_name: 'value', // optional. Any additional order field value.
              order_items: orderItems,
            },
            profile: {
              type: 'customer',
              status: 'FALSE',
              field_name: 'value',
              address: {
                given_name: customerInfo.field_first_name,
                family_name: customerInfo.field_last_name,
                organization: customerInfo.field_address,
                country_code: 'AU',
                address_line1: customerInfo.field_address,
                locality: customerInfo.field_suburb,
                administrative_area: customerInfo.field_state,
                postal_code: customerInfo.field_postcode,
              },
            },

            user: {
              mail: customerInfo.field_email,
            },
            payment: {
              gateway: 'paypal_test',
              type: 'paypal_ec',
              details: {
                type: 'single',
                data: {
                  intent: 'sale',
                },
              },
            },
          };
          myHeaders.append('Content-Type', 'application/json');
          myHeaders.append('Authorization', encodeLogin);
          // Request products
          fetch(`${RequestType.URL}/commerce/order/create`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(myBody),
          })
            .then((response) => response.json())
            .then((data: any) => {
              if (data.order_id[0].value) {
                this.processPayment(data.order_id[0].value);
              } else {
                alert('Sorry, cannot create order.');
              }
            })
            .catch((error) => console.log(error));
        } else {
          alert('Sorry, please fill in the form.');
        }
      }
    }
  }

  // import { APIModel } from '../../utils/api/Api.model';
  // fetch products data
  processPayment(orderId: number) {
    if (this.props.loginDetails) {
      const myHeaders = new Headers();
      const encodeLogin = `Basic ${base64.encode(loginDetails)}`;

      const myBody = {
        gateway: 'paypal_test',
        type: 'paypal_ec',
        details: {
          type: 'single',
          data: {
            intent: 'sale',
          },
        },
      };

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', encodeLogin);
      // Request products
      fetch(`${RequestType.URL}/commerce/payment/create/${orderId}`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(myBody),
      })
        .then((response) => response.json())
        .then((data: any) => {
          // open paypal page to process payment
          window.open(data.paypalUrl, '_self');
          // fetch payment info to store for payment success page
          if (this.props.fetchPaymentInfo && this.props.paymentInfo) {
            this.props.fetchPaymentInfo({
              paymentInfo: { orderId: data.orderId, paymentId: data.paymentId },
            });
          } else {
            alert('Payment cannot be generated');
          }
        })
        .catch((error) => console.log(error));
    }
  }

  // render all product card
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m9 s12">
            <div className="block--orders collection">
              <Address />
              <Cart />
            </div>
            <div>
              <button onClick={() => this.submitOrder()}>Submit Order</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: any) => {
  return {
    loginDetails: store.loginDetails,
    address: store.address.address,
    cart: store.cart.cart,
    paymentInfo: store.paymentInfo.paymentInfo,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ fetchPaymentInfo }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkout);
