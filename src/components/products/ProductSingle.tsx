/**
 * Product component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';

// Import the dependent interfaces
import { RequestType } from '../../utils/api/Api.enum';
import { ProductSinglePropsInterface, ProductSingleStateInterface } from './Products.interface';

class ProductSingle extends React.Component<ProductSinglePropsInterface, ProductSingleStateInterface> {
  constructor(props: ProductSinglePropsInterface) {
    super(props);

    this.state = { value: this.props.product.sku };
  }

  checkoutOrder() {
    const userName = this.props.username;
    const address = {
      given_name: 'first name',
      family_name: 'last name',
      organization: 'address 1',
      country_code: 'AU',
      address_line1: 'address 1',
      locality: 'suburb',
      administrative_area: 'state',
      postal_code: 'postcode',
    };

    const orderItems = [
      {
        sku: this.props.product.sku,
        qty: 1,
      },
    ];

    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');

    // Request products
    fetch(`${RequestType.URL}/drupalup/add_to_order`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(orderItems),
    })
      .then((response) => response.json())
      .then((data: any) => console.log(data))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col s3 grey-text">
            <h6>{this.props.product.sku}</h6>
            <h5 className="red-text">${this.props.product.price__number}</h5>
          </div>
          <div className="col s6">{this.props.product.title}</div>
          <div className="col s6">
            <button onClick={() => this.checkoutOrder()}>Checkout</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductSingle;
