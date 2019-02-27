/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import style
import Typography from '@material-ui/core/Typography';
// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Import the dependent interfaces
import routes from '../../routes';
import { ReportPropsInterface, ReportStateInterface } from './Report.interface';

class Report extends React.Component<ReportPropsInterface, ReportStateInterface> {
  constructor(props: ReportPropsInterface) {
    super(props);
  }

  // render all orders card
  render() {
    return (
      <React.Fragment>
        <Typography component="h1" variant="h3">
          Error reports.
        </Typography>
        <Typography>
          <Link to={routes.home}>Home</Link>
        </Typography>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: any) => {
  return { loginDetails: store.loginDetails };
};

export default connect(mapStateToProps)(Report);
