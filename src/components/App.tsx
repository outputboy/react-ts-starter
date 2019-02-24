/**
 * App.tsx
 * App component.
 */
'use strict';

// Import the dependent modules
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { StyleRulesCallback, StyledComponentProps, WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

// Import the dependent components
import { snackbarPush } from '../actions';
import routes from '../routes';
import NotFound from './NotFound';
import Test from './Test';
import TheSnackbar from './TheSnackbar';
import Cart from './cart/Cart';
import Checkout from './checkout/Checkout';
import Success from './checkout/Success';
import Home from './home/Home';
import Orders from './orders/Orders';
import OrdersImport from './ordersImport/OrdersImport';
import Products from './products/Products';
import ProductsImport from './productsImport/ProductsImport';
import Sidebar from './sidebar/Sidebar';

// Define types
type ClassKeys = 'root' | 'cartPos';
interface DispatchProps {
  snackbarPush: typeof snackbarPush;
}
type Props = ComponentProps & DispatchProps;

interface ComponentProps {
  title?: string;
}

const styles: StyleRulesCallback<ClassKeys> = (theme) => ({
  '@global': {
    code: {
      color: theme.palette.secondary.main,
      fontFamily: 'Consolas, monospace',
    },
  },
  root: {
    maxWidth: 1200,
    margin: 'auto',
  },
  cartPos: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

/**
 * Listens to changes in the location and performs redux store updates.
 *
 * @method locationChange
 *
 * @param { string } path - the location path.
 *
 * @return UnregisterCallback
 */
class App extends React.Component<Props & WithStyles<ClassKeys>> {
  testSnackbar = () => {
    this.props.snackbarPush({
      button: {
        callback: () => {
          // Snackbar is automatically dismissed when the button is clicked
        },
        label: 'Close',
      },
      message: <Cart />,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} md={4}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} md={8}>
            <Switch>
              <Route exact path={routes.home} component={Home} />
              <Route exact path={routes.test} component={Test} />
              <Route exact path={routes.products} component={Products} />
              <Route exact path={routes.orders} component={Orders} />
              <Route exact path={routes.checkout} component={Checkout} />
              <Route exact path={routes.success} component={Success} />
              <Route exact path={routes.cart} component={Cart} />
              <Route exact path={routes.productsImport} component={ProductsImport} />
              <Route exact path={routes.ordersImport} component={OrdersImport} />
              <Route component={NotFound} />
            </Switch>
          </Grid>

          <Button color="primary" onClick={this.testSnackbar} variant="contained" className={classes.cartPos}>
            Shopping Cart
          </Button>
          <TheSnackbar />
        </Grid>
      </div>
    );
  }
}

const StyledComponent = withStyles(styles)(App);

export type AppProps = Props & StyledComponentProps<ClassKeys>;
export { StyledComponent as TestComponent };

export default connect<void, DispatchProps, ComponentProps>(
  undefined,
  { snackbarPush },
)(StyledComponent);
