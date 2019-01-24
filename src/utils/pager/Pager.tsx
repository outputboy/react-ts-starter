/**
 * Pager.tsx
 * Pager component.
 */
'use strict';

// Import the dependent modules.
import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';

// Import the dependent interfaces.
import { PagerLink, PagerProps, PagerState } from './Pager.interface';

class Pager extends React.Component<PagerProps, PagerState> {
  constructor(props: PagerProps) {
    super(props);
    // Define the empty pager links
    this.state = {
      links: [],
      nextLink: {
        label: '',
        value: '',
      },
      previousLink: {
        label: '',
        value: '',
      },
      currentLink: {
        label: '',
        value: '',
      },
    };
  }

  // Create a link to be used for pagination

  render() {
    return (
      <div className="block--pager">
        <ul className="pagination">
          <li className="disabled">
            <a href="#!">
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
          <li className="active">
            <a href="#!">1</a>
          </li>
          <li className="waves-effect">
            <a href="#!">2</a>
          </li>
          <li className="waves-effect">
            <a href="#!">3</a>
          </li>
          <li className="waves-effect">
            <a href="#!">4</a>
          </li>
          <li className="waves-effect">
            <a href="#!">5</a>
          </li>
          <li className="waves-effect">
            <a href="#!">
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pager;
