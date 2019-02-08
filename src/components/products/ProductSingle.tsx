/**
 * Product component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';

// Import the dependent interfaces
import { Dispatch, bindActionCreators } from 'redux';

// Import interface
import { FetchCartData, fetchCart } from '../../actions/cartActions';
import { ProductSinglePropsInterface, ProductSingleStateInterface, ProductsDataInterface } from './Products.interface';

class ProductSingle extends React.Component<ProductSinglePropsInterface, ProductSingleStateInterface> {
  constructor(props: ProductSinglePropsInterface) {
    super(props);
  }

  addToCart() {
    const cart: Array<ProductsDataInterface> = this.props.cart;
    cart.push(this.props.product);

    const payload: FetchCartData = { cart };

    if (this.props.fetchCart) {
      this.props.fetchCart(payload);
    }
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
            <button onClick={() => this.addToCart()}>AddToCart</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: any) => {
  return { loginDetails: store.loginDetails, cart: store.cartDetails.cart };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ fetchCart }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductSingle);
