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
import { fetchCart } from '../../actions/cartActions';
import { CartDataInterface } from '../cart/Cart.interface';
import { ProductSinglePropsInterface, ProductSingleStateInterface, ProductsDataInterface } from './Products.interface';

class ProductSingle extends React.Component<ProductSinglePropsInterface, ProductSingleStateInterface> {
  constructor(props: ProductSinglePropsInterface) {
    super(props);
  }

  addToCart() {
    const cart: Array<CartDataInterface> = this.props.cart;
    const product: ProductsDataInterface = this.props.product;
    // Find if product already exist in cart
    if (
      cart.some((el) => {
        return el.variation_id === product.variation_id;
      })
    ) {
      // If product exist in cart then add to qty and price
      cart.map((singleCart: CartDataInterface, key: number) => {
        if (singleCart.variation_id === this.props.product.variation_id) {
          cart[key].singleQty = cart[key].singleQty + 1;
          cart[key].singleTotal = cart[key].singleTotal + Number(this.props.product.price__number);
        }
      });
    } else {
      // If product not exist then push new product row
      cart.push({ ...this.props.product, singleQty: 1, singleTotal: Number(this.props.product.price__number) });
    }

    const payload = { cart };

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
  console.log(store);
  return { loginDetails: store.loginDetails, cart: store.cart.cart };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ fetchCart }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductSingle);
