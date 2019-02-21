/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';

// Import the dependent components

// Import the dependent interfaces
import { OrdersDataInterface, OrdersPropsInterface, OrdersStateInterface } from './Orders.interface';
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
