/**
 * ProductsSearch.tsx
 * Products search component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';

// Import style
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// Import interfaces
import { ProductsSearchPropsInterface, ProductsSearchStateInterface } from './Products.interface';

class ProductSearch extends React.Component<ProductsSearchPropsInterface, ProductsSearchStateInterface> {
  constructor(props: ProductsSearchPropsInterface) {
    super(props);

    this.state = { keywords: '' };
    this.updateSearch = this.updateSearch.bind(this);
  }

  // search while press button
  updateSearch() {
    this.props.fetchProducts(`/products?sku=${this.state.keywords}&title=${this.state.keywords}`);
  }

  // on change update state
  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ keywords: e.currentTarget.value });
  };

  // update state when press enter
  onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.updateSearch();
    }
  };

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={9}>
          <input
            id="search"
            type="text"
            value={this.state.keywords}
            className="search-product"
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            style={{ width: '100%', padding: '8px', margin: '0 8px' }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" size="small" onClick={this.updateSearch}>
            search
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default ProductSearch;
