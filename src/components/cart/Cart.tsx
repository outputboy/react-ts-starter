/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';

// Import the dependent interfaces
import { CartPropsInterface, CartStateInterface } from './Cart.interface';
const base64 = require('base-64');

class Cart extends React.Component<CartPropsInterface, CartStateInterface> {
  constructor(props: CartPropsInterface) {
    super(props);
  }

  // render all product card
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m9 s12">
            <div className="block--cart collection" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: any) => {
  console.log(store);
  return {};
};

export default connect(mapStateToProps)(Cart);
