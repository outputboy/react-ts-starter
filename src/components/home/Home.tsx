/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import the dependent modules

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

// Import the dependent components
import Login from '../login/Login';

// Import the dependent interfaces
import { HomePropsInterface } from './Home.interface';

class Home extends React.PureComponent<HomePropsInterface> {
  static defaultProps = {
    title: 'Welcome',
  };

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="baseline" spacing={16}>
        <Typography color="inherit" component="h1" variant="h3">
          {this.props.title}
        </Typography>
        <Login />
      </Grid>
    );
  }
}

export default Home;
