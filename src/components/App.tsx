import { StyleRulesCallback, StyledComponentProps, WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch } from 'react-router';
import routes from '../routes';
import Home from './Home';
import NotFound from './NotFound';
import Test from './Test';
import TheSnackbar from './TheSnackbar';
import Orders from './orders/Orders';
import Products from './products/Products';

type ClassKeys = 'root';

const styles: StyleRulesCallback<ClassKeys> = (theme) => ({
  '@global': {
    code: {
      color: theme.palette.secondary.main,
      fontFamily: 'Consolas, monospace',
    },
  },
  root: {},
});

type Props = {};

class App extends React.Component<Props & WithStyles<ClassKeys>> {
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
            <Route component={NotFound} />
          </Switch>
        </main>
        <TheSnackbar />
      </div>
    );
  }
}

const StyledComponent = withStyles(styles)(App);

export type AppProps = Props & StyledComponentProps<ClassKeys>;
export { StyledComponent as TestComponent };

export default StyledComponent;
