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

import Pager from '../../utils/pager/Pager';

// Import the dependent components
import ProductSingle from './ProductSingle';
import ProductSearch from './ProductsSearch';

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

    this.fetchProducts = this.fetchProducts.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  // Fetch products data
  componentWillMount() {
    this.fetchProducts('/products');
  }

  // Fetch products based on search keywords
  fetchProducts(fetchUrl: string) {
    if (this.props.loginDetails) {
      // Request products
      APIModel.request(APIModel.requestAPI(fetchUrl, this.props.loginDetails))
        .promise.then((data: any) => {
          if (data.message === '') {
            console.log('No permission to view products');
          } else {
            this.setState({ productsFields: data });
          }
        })
        .catch((error: {}) => console.log(error));
    }
  }

  // Updates the request based on pager
  updateContent(query: string) {
    this.fetchProducts(`/products${query}`);
  }

  // render all product card
  render() {
    if (this.state) {
      return (
        <React.Fragment>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper>
                <ProductSearch fetchProducts={this.fetchProducts} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <Link to="/checkout" style={styles.linkStyles}>
                  <Button variant="contained" color="primary" size="small" style={{ width: '100%' }}>
                    {`Go to cart`}
                  </Button>
                </Link>
              </Paper>
            </Grid>
            <Pager
              {...this.state.productsFields.pager}
              currentPath={this.props.location.search}
              updateQuery={this.updateContent}
            />
            {this.state.productsFields.rows.map((product: ProductsDataInterface, key: number) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={key}>
                  <ProductSingle
                    product={product}
                    username={this.props.loginDetails ? this.props.loginDetails.username : ''}
                  />
                </Grid>
              );
            })}
          </Grid>
        </React.Fragment>
      );
    }

    return <div>loading</div>;
  }
}

const mapStateToProps = (store: any) => {
  return { loginDetails: store.loginDetails };
};

export default connect(mapStateToProps)(Products);
