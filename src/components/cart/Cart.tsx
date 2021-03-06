/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

// Import the dependent components
import { deleteCartProduct } from '../../actions/cartActions';

// Import style
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Import the dependent interfaces
import { CartDataInterface, CartPropsInterface, CartStateInterface } from './Cart.interface';

/**
 * Listens to changes in the location and performs redux store updates.
 *
 * @method locationChange
 *
 * @param { string } path - the location path.
 *
 * @return UnregisterCallback
 */
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
      <React.Fragment>
        {this.state.shoppingCart.map((cartItem: CartDataInterface, key: number) => {
          return (
            <Card key={key}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {'SKU'}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  {cartItem.sku}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {'Title'}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  {cartItem.title}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {'Quantity'}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  {cartItem.singleQty}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {'Price'}
                </Typography>
                <Typography color="textPrimary" gutterBottom>
                  {cartItem.singleTotal}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" variant="contained" onClick={() => this.removeFromCart(key)}>
                  remove
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </React.Fragment>
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
