/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
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
      // const loginDetails = `${this.props.loginDetails.username}:${this.props.loginDetails.password}`;
      const loginDetails = '306380373:123456';
      const encodeLogin = `Basic ${base64.encode(loginDetails)}`;

      /*
      const myBody = {
        order: {
          type: 'default',
          email: '306380373@qq.com',
          store: 1, // optional. Store ID. Defaults to the default store in the system.
          field_name: 'value', // optional. Any additional order field value.
          order_items: [
            {
              type: 'default',
              title: '',
              quantity: 2,
              purchased_entity: { sku: 'test-product-02' },
            },
          ],
        },
        profile: [{ type: 'customer', status: 'FALSE', filed_name: 'value' }],
        user: {
          mail: '306380373@qq.com',
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
      */
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
      fetch(`${RequestType.URL}/commerce/payment/capture/86/15`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(myBody),
      })
        .then((response) => response.json())
        .then((data: OrdersFieldInterface) => console.log(data))
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
              {this.state.ordersData.rows.map((order: OrdersDataInterface, key: number) => {
                return (
                  <div key={key} className="block block--single-order collection-item">
                    <div>{order.order_id}</div>
                  </div>
                );
              })}
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