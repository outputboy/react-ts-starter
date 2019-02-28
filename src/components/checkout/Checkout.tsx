/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import style
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { fetchPaymentInfo } from '../../actions/paymentInfoActions';
import { APIModel } from '../../utils/api/Api.model';

// Import the dependent components
import Address from '../../utils/address/Address';
import Cart from '../cart/Cart';

// Import the dependent interfaces
import { AddressValid } from '../../utils/address/Address.interface';
import { CartDataInterface } from '../cart/Cart.interface';
import { CheckoutPropsInterface, CheckoutStateInterface, IndividualProductOrderInterface } from './Checkout.interface';
const base64 = require('base-64');

class Checkout extends React.Component<CheckoutPropsInterface, CheckoutStateInterface> {
  constructor(props: CheckoutPropsInterface) {
    super(props);
  }

  // import { APIModel } from '../../utils/api/Api.model';
  // fetch products data
  submitOrder() {
    if (this.props.loginDetails) {
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
          // construct body info
          const myBody = {
            order: {
              type: 'default',
              email: customerInfo.field_email,
              store: 1, // optional. Store ID. Defaults to the default store in the system.
              field_name: 'value', // optional. Any additional order field value.
              order_items: orderItems,
            },
            // Customer profile and address info
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

          // Request products
          APIModel.request(APIModel.requestAPI('/commerce/order/create', this.props.loginDetails, myBody))
            .promise.then((data: any) => {
              if (data.order_id[0].value) {
                this.processPayment(data.order_id[0].value);
              } else {
                alert('Sorry, cannot create order.');
              }
            })
            .catch((error: {}) => console.log(error));
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

      // Request products
      APIModel.request(APIModel.requestAPI(`/commerce/payment/create/${orderId}`, this.props.loginDetails, myBody))
        .promise.then((data: any) => {
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
        .catch((error: {}) => console.log(error));
    }
  }

  // render all product card
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item md={6} xs={12}>
          <Paper>
            <Address />
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper>
            <Cart />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ width: '100%' }}
              onClick={() => this.submitOrder()}
            >
              Submit Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
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
