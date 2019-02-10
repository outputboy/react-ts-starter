/**
 * Products.tsx
 * Products component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Import the dependent components
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
    this.fetchProducts();
  }

  // Fetch products based on search keywords
  fetchProducts() {
    if (this.props.loginDetails) {
      const myHeaders = new Headers();
      const loginDetails = `${this.props.loginDetails.username}:${this.props.loginDetails.password}`;
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
                    <ProductSingle
                      product={product}
                      username={this.props.loginDetails ? this.props.loginDetails.username : ''}
                    />
                  </div>
                );
              })}
            </div>
            <div className="row">
              <Link to="/cart">Go to cart</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: any) => {
  return { loginDetails: store.loginDetails };
};

export default connect(mapStateToProps)(Products);
