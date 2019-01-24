/**
 * Products.tsx
 * Products component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';

// Import the dependent components
import store from '../../store';
import { RequestType } from '../../utils/api/Api.enum';
import ProductSingle from './ProductSingle';

// Import the dependent interfaces
import {
  ProductsDataInterface,
  ProductsFieldInterface,
  ProductsPropsInterface,
  ProductsStateInterface,
} from './Products.interface';
const base64 = require('base-64');

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
    this.fetchProducts('');
  }

  // Fetch products based on search keywords
  fetchProducts(filterUrl: string) {
    const myHeaders = new Headers();
    const loginDetails = `${store.getState().loginDetails.username}:${store.getState().loginDetails.password}`;
    const encodeLogin = `Basic ${base64.encode(loginDetails)}`;

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', encodeLogin);

    // Request products
    fetch(`${RequestType.URL}/products`, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data: ProductsFieldInterface) => {
        this.setState({ productsFields: data });
      })
      .catch((error) => console.log(error));
  }

  // render all product card
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col m9 s12">
            <div className="row block--product">
              {this.state.productsFields.rows.map((product: ProductsDataInterface, key: number) => {
                return (
                  <div key={key} className="block block--product card-panel">
                    <ProductSingle product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
