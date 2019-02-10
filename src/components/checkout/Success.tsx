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
import { SuccessPropsInterface, SuccessStateInterface } from './Checkout.interface';
const base64 = require('base-64');
const queryString = require('query-string');

class Checkout extends React.Component<SuccessPropsInterface, SuccessStateInterface> {
  constructor(props: SuccessPropsInterface) {
    super(props);
  }

  // import { APIModel } from '../../utils/api/Api.model';
  // fetch products data
  componentDidMount() {
    if (location.search) {
      const parsed = queryString.parse(location.search);

      const myHeaders = new Headers();
      // const loginDetails = `${this.props.loginDetails.username}:${this.props.loginDetails.password}`;
      const loginDetails = '306380373:123456';
      const encodeLogin = `Basic ${base64.encode(loginDetails)}`;

      const payID: string = parsed.paymentId;

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', encodeLogin);
      // Request products
      fetch(`${RequestType.URL}/commerce/payment/capture/${payID}/1`, {
        method: 'POST',
        headers: myHeaders,
      })
        .then((response) => response.json())
        .then((data: any) => console.log(data))
        .catch((error) => console.log(error));
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
  return {};
};

export default connect(mapStateToProps)(Checkout);
