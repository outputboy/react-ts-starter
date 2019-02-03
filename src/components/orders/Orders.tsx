/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { PaypalExpressBtn } from 'react-paypal-express-checkout';
import { connect } from 'react-redux';

// Import the dependent components
import { RequestType } from '../../utils/api/Api.enum';

// Import the dependent interfaces
import {
  OrdersDataInterface,
  OrdersFieldInterface,
  OrdersPropsInterface,
  OrdersStateInterface,
} from './Orders.interface';
const base64 = require('base-64');

class Orders extends React.Component<OrdersPropsInterface, OrdersStateInterface> {
  constructor(props: OrdersPropsInterface) {
    super(props);

    this.state = {
      ordersData: {
        rows: [],
        pager: {
          current_page: 0,
          items_per_page: 0,
          total_items: '',
          total_pages: 0,
        },
      },
      paymentTotal: 0,
      orderId: [],
    };
  }

  // import { APIModel } from '../../utils/api/Api.model';
  // fetch products data
  componentWillMount() {
    if (this.props.loginDetails) {
      const myHeaders = new Headers();
      const loginDetails = `${this.props.loginDetails.username}:${this.props.loginDetails.password}`;
      const encodeLogin = `Basic ${base64.encode(loginDetails)}`;

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', encodeLogin);
      // Request products
      fetch(`${RequestType.URL}/orders`, {
        method: 'GET',
        headers: myHeaders,
      })
        .then((response) => response.json())
        .then((data: OrdersFieldInterface) => this.setState({ ordersData: data }))
        .catch((error) => console.log(error));
    }
  }

  // render all product card
  render() {
    const client = {
      sandbox: 'AZqvl7HJY7zdbBvSKSC8w_maxKHtpzMxshJojXjC99gNSm4poFftarulDlFkpVjYqe_zD9VVmoP4CMYw',
      production: 'YOUR-PRODUCTION-APP-ID',
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col m9 s12">
            <div className="block--orders collection">
              {this.state.ordersData.rows.map((order: OrdersDataInterface, key: number) => {
                return (
                  <div key={key} className="block block--single-order collection-item">
                    <div>{order.order_id}</div>
                  </div>
                );
              })}
            </div>
            <div className="col m4 s12 offset-m8">
              <PaypalExpressBtn env={'sandbox'} client={client} currency={'AUD'} total={this.state.paymentTotal} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: any) => {
  return { loginDetails: store.loginDetails };
};

export default connect(mapStateToProps)(Orders);
