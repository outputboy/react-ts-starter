/**
 * Sidebar.tsx
 * Sidebar component.
 */
'use strict';

// Import the dependent modules
import * as React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes';

const Sidebar: React.SFC<{}> = () => {
  return (
    <div className="block block--sidebar collection">
      <Link to={routes.profile} className="collection-item blue-text">
        <i className="material-icons">account_circle</i>
        Profile
      </Link>
      <Link to={routes.products} className="collection-item blue-text">
        <i className="material-icons">highlight</i>
        Products
      </Link>
      <Link to={routes.orders} className="collection-item blue-text">
        <i className="material-icons">shopping_cart</i>
        My Orders
      </Link>
      <Link to={routes.ordersImport} className="collection-item blue-text">
        <i className="material-icons">add_shopping_cart</i>
        Import Orders
      </Link>
      <Link to={routes.test} className="collection-item blue-text">
        <i className="material-icons">file_download</i>
        Data Download
      </Link>
      <Link to={routes.test} className="collection-item blue-text">
        <i className="material-icons">report_problem</i>
        Report
      </Link>
    </div>
  );
};

export default Sidebar;
