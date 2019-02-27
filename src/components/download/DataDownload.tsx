/**
 * OrderImport.tsx
 * Order import component.
 */
'use strict';

// Import the dependent modules
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

const DataDownload: React.SFC = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography variant={'h5'} gutterBottom>
              Download product sample.
            </Typography>
          </CardContent>
          <CardActions className="card-action">
            <a href="/sample/product_import.csv" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Products
              </Button>
            </a>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography variant={'h5'} gutterBottom>
              Download order sample.
            </Typography>
          </CardContent>
          <CardActions className="card-action">
            <a href="/sample/order_import.csv" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Orders
              </Button>
            </a>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DataDownload;
