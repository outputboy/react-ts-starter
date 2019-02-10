/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { deleteCartProduct } from '../../actions/cartActions';

// Import the dependent interfaces
import { CartDataInterface, CartPropsInterface, CartStateInterface } from './Cart.interface';
const base64 = require('base-64');

class Cart extends React.Component<CartPropsInterface, CartStateInterface> {
  constructor(props: CartPropsInterface) {
    super(props);

    this.state = { shoppingCart: this.props.cart };
  }

  removeFromCart(index: number) {
    const cart = this.props.cart;
    cart.splice(index, 1);
    const payload = { cart };

    if (this.props.deleteCartProduct) {
      this.props.deleteCartProduct(payload);
    }

    this.setState({ shoppingCart: this.props.cart });
  }

  // render all product card
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m9 s12">
            <div className="block--cart collection">
              {this.state.shoppingCart.map((cartItem: CartDataInterface, key: number) => {
                return (
                  <div key={key} className="row">
                    <div className="col m2 s12">{cartItem.sku}</div>
                    <div className="col m2 s12">{cartItem.title}</div>
                    <div className="col m2 s12">{cartItem.singleQty}</div>
                    <div className="col m2 s12">{cartItem.singleTotal}</div>
                    <div className="col m2 s12">
                      <button onClick={() => this.removeFromCart(key)}>remove</button>
                    </div>
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
  return { cart: store.cart.cart };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ deleteCartProduct }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
