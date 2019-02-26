/**
 * Product component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';

// Import the dependent interfaces
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Dispatch, bindActionCreators } from 'redux';

// Import interface
import { fetchCart } from '../../actions/cartActions';
import { CartDataInterface } from '../cart/Cart.interface';
import { ProductSinglePropsInterface, ProductSingleStateInterface, ProductsDataInterface } from './Products.interface';

const styles = {
  card: {},
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

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
      <Card style={styles.card}>
        <CardContent>
          <Typography style={styles.title} color="textSecondary" gutterBottom>
            {this.props.product.sku}
          </Typography>
          <Typography variant="h5" component="h2">
            ${this.props.product.price__number}
          </Typography>
          <Typography style={styles.pos} color="textSecondary">
            {this.props.product.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={() => this.addToCart()}>
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (store: any) => {
  return { loginDetails: store.loginDetails, cart: store.cart.cart };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ fetchCart }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductSingle);
