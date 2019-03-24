/**
 * PagerNumber.tsx
 * Pager Number component.
 */
'use strict';

// Import the dependent modules.
import * as React from 'react';

// Import the dependent interfaces.
import { PagerLink, PagerNumberProps } from './Pager.interface';

/**
 * Render page number base on the current page and total page links.
 * @class PagerNumber
 */
class PagerNumber extends React.Component<PagerNumberProps> {
  render() {
    // Init links props
    const links = this.props.links;
    /**
     * Return ellipsis if more than 5 pages.
     *
     */
    return links.length > 5
      ? links.map((link: PagerLink, key: number) => {
          const currentPage: number = this.props.current_page;
          /**
           * Init pager span and show one more page number.
           * for first and last page.
           *
           */
          const lessThan: number = currentPage === 0 ? currentPage + 2 : currentPage + 1;
          const biggerThan: number = currentPage === links.length - 1 ? currentPage - 2 : currentPage - 1;

          // Init active page number class.
          const activeClass: string = key === currentPage ? 'active' : '';

          switch (true) {
            /**
             * First page.
             */
            case key === 0:
              // Add pager class to show ellipsis.
              const firstClass: string = currentPage > 2 ? ' first-pager' : '';
              return (
                <li key={key} className={activeClass + firstClass}>
                  <a onClick={() => this.props.updateQuery(link.value)}>{link.label}</a>
                </li>
              );
            /**
             * Last page.
             */
            case key === links.length - 1:
              // Add pager class to show ellipsis.
              const lastClass: string = currentPage < links.length - 3 ? ' last-pager' : '';
              return (
                <li key={key} className={activeClass + lastClass}>
                  <a onClick={() => this.props.updateQuery(link.value)}>{link.label}</a>
                </li>
              );
            /**
             * Other pages.
             */
            case key <= lessThan && key >= biggerThan:
              return (
                <li key={key} className={activeClass}>
                  <a onClick={() => this.props.updateQuery(link.value)}>{link.label}</a>
                </li>
              );
            default:
              return null;
          }
        })
      : /**
         * Show each page number if less than 5 pages.
         */
        links.map((link: PagerLink, key: number) => {
          return (
            <li key={key}>
              <a onClick={() => this.props.updateQuery(link.value)}>{link.label}</a>
            </li>
          );
        });
  }
}

export default PagerNumber;
