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
import { APIModel } from '../../utils/api/Api.model';

// Import the dependent interfaces
import { SuccessPropsInterface, SuccessStateInterface } from './Checkout.interface';
const base64 = require('base-64');

class Checkout extends React.Component<SuccessPropsInterface, SuccessStateInterface> {
  constructor(props: SuccessPropsInterface) {
    super(props);
  }

  // import { APIModel } from '../../utils/api/Api.model';
  // fetch products data
  componentDidMount() {
    if (location.search && this.props.loginDetails) {
      const myHeaders = new Headers();
      const loginDetails = `${this.props.loginDetails.username}:${this.props.loginDetails.password}`;
      const encodeLogin = `Basic ${base64.encode(loginDetails)}`;

      let orderId = '';
      let paymentId = '';

      if (this.props.paymentInfo) {
        orderId = this.props.paymentInfo.orderId;
        paymentId = this.props.paymentInfo.paymentId;
      }

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', encodeLogin);

      const apiData = { method: 'POST', headers: myHeaders };

      // Request products
      APIModel.request(APIModel.requestAPI(`/commerce/payment/capture/${orderId}/${paymentId}`, apiData))
        .promise.then((data: any) => {
          console.log(data);
        })
        .catch((error: {}) => console.log(error));
    }
  }

  // render all product card
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m9 s12">
            <div className="block--orders collection">success</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: any) => {
  console.log(store);
  return {
    loginDetails: store.loginDetails,
    paymentInfo: store.paymentInfo.paymentInfo,
  };
};

export default connect(mapStateToProps)(Checkout);
