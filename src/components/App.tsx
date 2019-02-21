import Button from '@material-ui/core/Button';
import { StyleRulesCallback, StyledComponentProps, WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
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
import Products from './products/Products';
import ProductsImport from './productsImport/ProductsImport';

type ClassKeys = 'root';
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
  root: {},
});

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
        <main>
          <Switch>
            <Route exact path={routes.home} component={Home} />
            <Route path={routes.test} component={Test} />
            <Route path={routes.products} component={Products} />
            <Route path={routes.orders} component={Orders} />
            <Route path={routes.checkout} component={Checkout} />
            <Route path={routes.success} component={Success} />
            <Route path={routes.cart} component={Cart} />
            <Route path={routes.productsImport} component={ProductsImport} />
            <Route component={NotFound} />
          </Switch>

          <Button
            color="primary"
            onClick={this.testSnackbar}
            variant="contained"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          >
            Shopping Cart
          </Button>
        </main>
        <TheSnackbar />
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
