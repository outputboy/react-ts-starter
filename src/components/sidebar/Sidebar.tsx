/**
 * Sidebar.tsx
 * Sidebar component.
 */
'use strict';

// Import the dependent modules
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CheckoutIcon from '@material-ui/icons/CheckOutlined';
import FileDownloadIcon from '@material-ui/icons/CloudDownload';
import HighlightIcon from '@material-ui/icons/Highlight';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import * as React from 'react';

// Import the dependent components
import routes from '../../routes';

/**
 * Listens to changes in the location and performs redux store updates.
 *
 * @method locationChange
 *
 * @param { string } path - the location path.
 *
 * @return UnregisterCallback
 */
class Sidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <List component="nav">
          <ListItem button component="a" href={routes.profile}>
            <ListItemIcon>
              <AccountCircleIcon color={'primary'} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component="a" href={routes.products}>
            <ListItemIcon>
              <HighlightIcon color={'primary'} />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button component="a" href={routes.checkout}>
            <ListItemIcon>
              <CheckoutIcon color={'primary'} />
            </ListItemIcon>
            <ListItemText primary="Checkout" />
          </ListItem>
          <ListItem button component="a" href={routes.productsImport}>
            <ListItemIcon>
              <AddShoppingCartIcon color={'primary'} />
            </ListItemIcon>
            <ListItemText primary="Import Products" />
          </ListItem>
          <ListItem button component="a" href={routes.orders}>
            <ListItemIcon>
              <ShoppingCartIcon color={'primary'} />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItem>
          <ListItem button component="a" href={routes.ordersImport}>
            <ListItemIcon>
              <AddShoppingCartIcon color={'primary'} />
            </ListItemIcon>
            <ListItemText primary="Import Orders" />
          </ListItem>
          <ListItem button component="a" href={routes.test}>
            <ListItemIcon>
              <FileDownloadIcon color={'primary'} />
            </ListItemIcon>
            <ListItemText primary="Data Download" />
          </ListItem>
          <ListItem button component="a" href={routes.test}>
            <ListItemIcon>
              <ReportProblemIcon color={'primary'} />
            </ListItemIcon>
            <ListItemText primary="Report" />
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}

export default Sidebar;
