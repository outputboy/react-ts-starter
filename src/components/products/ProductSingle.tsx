/**
 * Product component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';

// Import the dependent interfaces
import { ProductSinglePropsInterface, ProductSingleStateInterface } from './Products.interface';

class ProductSingle extends React.Component<ProductSinglePropsInterface, ProductSingleStateInterface> {
  constructor(props: ProductSinglePropsInterface) {
    super(props);

    this.state = { value: this.props.product.sku, copied: false };
  }

  Copied = () => {
    this.setState({ copied: true });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col s3 grey-text">
            <h6>{this.props.product.sku}</h6>
            <h5 className="red-text">${this.props.product.price__number}</h5>
          </div>
          <div className="col s6">{`${this.props.product.title}`}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductSingle;
