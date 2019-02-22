/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import style
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';

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
    const checkedValue: string = event.currentTarget.value;
    const OrdersIdToSubmit: string[] = this.state.submitOrders;

    if (event.currentTarget.checked) {
      OrdersIdToSubmit.push(checkedValue);
    } else {
      _.remove(OrdersIdToSubmit, (n) => {
        return n === checkedValue;
      });
    }

    this.setState({ submitOrders: OrdersIdToSubmit });
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
                    control={<Checkbox color="primary" onChange={this.handleCheckbox} value={order.order_id} />}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: any) => {
  return { loginDetails: store.loginDetails };
};

export default connect(mapStateToProps)(Orders);
