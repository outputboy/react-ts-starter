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
import { OrdersDataInterface } from '../orders/Orders.interface';
import { CheckoutPropsInterface, CheckoutStateInterface } from './Checkout.interface';

class Orders extends React.Component<CheckoutPropsInterface, CheckoutStateInterface> {
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
