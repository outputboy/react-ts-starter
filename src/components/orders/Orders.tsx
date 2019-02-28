/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import style
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';

import { PayPalButton } from 'react-paypal-button-v2';
import { APIModel } from '../../utils/api/Api.model';

// Import the dependent components
const base64 = require('base-64');

// Import the dependent interfaces
import { OrdersDataInterface, OrdersPropsInterface, OrdersStateInterface } from './Orders.interface';

class Orders extends React.Component<OrdersPropsInterface, OrdersStateInterface> {
  constructor(props: OrdersPropsInterface) {
    super(props);

    this.state = {
      ordersFields: {
        rows: [],
        pager: {
          current_page: 0,
          items_per_page: 0,
          total_items: '',
          total_pages: 0,
        },
      },
      paymentTotal: 0,
      submitOrders: [],
    };
    this.fetchOrders = this.fetchOrders.bind(this);
  }

  // Fetch products data
  componentWillMount() {
    this.fetchOrders();
  }

  // Fetch orders based on search keywords
  fetchOrders() {
    if (this.props.loginDetails) {
      // Init headers
      const myHeaders = new Headers();

      const loginDetails = `${this.props.loginDetails.username}:${this.props.loginDetails.password}`;
      const encodeLogin = `Basic ${base64.encode(loginDetails)}`;
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', encodeLogin);

      const apiData = { method: 'GET', headers: myHeaders };

      // Request orders
      APIModel.request(APIModel.requestAPI('/orders', apiData))
        .promise.then((data: any) => {
          this.setState({ ordersFields: data });
        })
        .catch((error: {}) => console.log(error));
    }
  }

  // Handle checkbox to construct order ids into string and ready for posting
  handleCheckbox = (event: React.FormEvent<HTMLInputElement>) => {
    // set order id
    const checkedValue: string = event.currentTarget.id;
    const OrdersIdToSubmit: string[] = this.state.submitOrders;

    // set total payment
    const priceNumber: string = event.currentTarget.value.substring(1, event.currentTarget.value.length);
    let totalToPay: number = this.state.paymentTotal;

    if (event.currentTarget.checked) {
      OrdersIdToSubmit.push(checkedValue);
      totalToPay += parseFloat(priceNumber);
    } else {
      _.remove(OrdersIdToSubmit, (n) => {
        return n === checkedValue;
      });
      totalToPay -= parseFloat(priceNumber);
    }

    this.setState({ submitOrders: OrdersIdToSubmit, paymentTotal: totalToPay });
  };

  // Pay multiple orders together
  handleMultiPayments = () => {
    const ordersID: string[] = this.state.submitOrders;

    if (this.props.loginDetails) {
      // Init headers
      const myHeaders = new Headers();

      const loginDetails = `${this.props.loginDetails.username}:${this.props.loginDetails.password}`;
      const encodeLogin = `Basic ${base64.encode(loginDetails)}`;
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', encodeLogin);

      const apiData = { method: 'POST', headers: myHeaders, body: JSON.stringify(ordersID) };

      // Request orders

      APIModel.request(APIModel.requestAPI('/parallel_pay', apiData))
        .promise.then((data: any) => {
          console.log(data);
        })
        .catch((error: {}) => console.log(error));
    }
  };

  // render all orders card
  render() {
    return (
      <React.Fragment>
        {this.state.ordersFields.rows.map((order: OrdersDataInterface, key: number) => {
          return (
            <React.Fragment key={key}>
              <Grid container spacing={24} style={{ margin: '20px 0', backgroundColor: '#eee' }}>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      order.state === 'Processing' ? (
                        <React.Fragment />
                      ) : (
                        <Checkbox
                          color="primary"
                          onChange={this.handleCheckbox}
                          id={order.order_id}
                          value={order.total_price__number}
                        />
                      )
                    }
                    label={order.order_number}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>{order.order_items}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>{order.state}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>{order.total_price__number}</Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
        <Grid item xs={12}>
          <PayPalButton
            amount={this.state.paymentTotal}
            onSuccess={(details: any, data: any) => {
              alert(`Transaction completed by ${details.payer.name.given_name}`);
              console.log(data.orderID);
              // OPTIONAL: Call your server to save the transaction
              if (this.props.loginDetails) {
                const passOrderIds: string = this.state.submitOrders.join();

                const myHeaders = new Headers();
                const loginDetails = `${this.props.loginDetails.username}:${this.props.loginDetails.password}`;
                const encodeLogin = `Basic ${base64.encode(loginDetails)}`;
                myHeaders.append('Content-Type', 'application/json');
                myHeaders.append('Authorization', encodeLogin);

                const body = {
                  paypal_order_id: data.orderID,
                  individual_order_ids: passOrderIds,
                };

                const apiData = { method: 'POST', headers: myHeaders, body: JSON.stringify(body) };

                // Request products
                APIModel.request(APIModel.requestAPI('/drupalup/bulk_orders', apiData))
                  .promise.then((responseData: any) => {
                    console.log(responseData);
                  })
                  .catch((error1: {}) => console.log(error1));
              }

              return fetch('/faq', {
                method: 'post',
                body: JSON.stringify({
                  orderID: data.orderID,
                }),
              });
            }}
            onError={(error: any) => {
              alert('please select an order');
            }}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: any) => {
  return { loginDetails: store.loginDetails };
};

export default connect(mapStateToProps)(Orders);
