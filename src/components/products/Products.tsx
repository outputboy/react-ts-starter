/**
 * Products.tsx
 * Products component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { APIModel } from '../../utils/api/Api.model';

// Import style
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Import the dependent components
import ProductSingle from './ProductSingle';
const base64 = require('base-64');

// Import the dependent interfaces
import { ProductsDataInterface, ProductsPropsInterface, ProductsStateInterface } from './Products.interface';

const styles = {
  linkStyles: {
    textDecoration: 'none',
    color: 'white',
  },
};

class Products extends React.Component<ProductsPropsInterface, ProductsStateInterface> {
  constructor(props: ProductsPropsInterface) {
    super(props);

    this.state = {
      productsFields: {
        rows: [],
        pager: {
          current_page: 0,
          items_per_page: 0,
          total_items: '',
          total_pages: 0,
        },
      },
    };
    this.fetchProducts = this.fetchProducts.bind(this);
  }

  // Fetch products data
  componentWillMount() {
    this.fetchProducts();
  }

  // Fetch products based on search keywords
  fetchProducts() {
    if (this.props.loginDetails) {
      // Init headers
      const myHeaders = new Headers();
      const loginDetails = `${this.props.loginDetails.username}:${this.props.loginDetails.password}`;
      const encodeLogin = `Basic ${base64.encode(loginDetails)}`;

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', encodeLogin);

      const apiData = { method: 'GET', headers: myHeaders };

      // Request products
      APIModel.request(APIModel.requestAPI('/products', apiData))
        .promise.then((data: any) => {
          this.setState({ productsFields: data });
        })
        .catch((error: {}) => console.log(error));
    }
  }

  // render all product card
  render() {
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper>
              <Link to="/checkout" style={styles.linkStyles}>
                <Button variant="contained" color="primary" size="small" style={{ width: '100%' }}>
                  {`Go to cart`}
                </Button>
              </Link>
            </Paper>
          </Grid>
          {this.state.productsFields.rows.map((product: ProductsDataInterface, key: number) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={key}>
                <Paper>
                  <ProductSingle
                    product={product}
                    username={this.props.loginDetails ? this.props.loginDetails.username : ''}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: any) => {
  return { loginDetails: store.loginDetails };
};

export default connect(mapStateToProps)(Products);
