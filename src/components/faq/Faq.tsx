/**
 * Orders.tsx
 * Orders component.
 */
'use strict';

// Import style
import Typography from '@material-ui/core/Typography';
// Import the dependent modules
import * as React from 'react';

// Import the dependent interfaces
import Paper from '@material-ui/core/Paper';

const Faq: React.SFC = () => {
  return (
    <React.Fragment>
      <Typography component="h1" variant="h3">
        FAQ
      </Typography>
      <Paper>
        <Typography component="h4" variant="h6">
          How to import
        </Typography>
        <Typography>Source</Typography>
      </Paper>
      <Paper>
        <Typography component="h4" variant="h6">
          How to import
        </Typography>
        <Typography>Source</Typography>
      </Paper>
    </React.Fragment>
  );
};

export default Faq;
