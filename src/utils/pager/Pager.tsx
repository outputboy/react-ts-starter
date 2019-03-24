/**
 * Filter.tsx
 * Filter component.
 */
'use strict';

// Import the dependent modules.
import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';

// Import the dependent components.
import Select from 'react-select';
import { Breakpoints } from '../../utils/styles/Breakpoints.enum';
import Icons from '../icons/Icons.model';
import Loading from '../loading/Loading';
import PagerNumber from './PagerNumber';

// Import the dependent enumerators.
import { Rotation } from '../icons/Icons.enum';
import { PlaceholderType } from '../loading/Loading.enum';

// Import the dependent interfaces.
import { PagerLink, PagerProps, PagerState } from './Pager.interface';

// Import the dependent styles.
import './Pager.css';

/**
 * Pager component class.
 * @class Pager
 */
class Pager extends React.Component<PagerProps, PagerState> {
  // Declare the component state.
  state: PagerState;

  /**
   * Initialize the Pager.
   * @constructor
   */
  constructor(props: PagerProps) {
    super(props);

    // Define the empty pager links.
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
      windowWidth: window.innerWidth,
    };

    // Bind this with update window size function
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // Update window dimension
  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth });
  }

  /**
   * Set the pager links upon loading the component.
   * @method componentDidMount
   */
  componentDidMount(): void {
    // if we don't have any properties, exit.
    if (!this.props) {
      return;
    }

    // Updates the pager links.
    this.updatePagerLinks(this.props);

    // Init window size for responsive pager design
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  // Remove resize listener after unmount
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  /**
   * Update the pager links when receiving new pager properties.
   * @method componentWillReceiveProps
   *
   * @param { PagerProps } nextProps - the updated properties.
   */
  componentWillReceiveProps(nextProps: PagerProps): void {
    // If the existing pager properties don't match the new pager properties,
    // update the state.
    if (
      this.props.total_items !== nextProps.total_items ||
      this.props.currentPath !== nextProps.currentPath ||
      this.props.current_page !== nextProps.current_page
    ) {
      this.updatePagerLinks(nextProps);
    }
  }

  /**
   * Creates a link to be used for pagination.
   * @method createLinkPath
   *
   * @param { string } existingPath - the existing url path.
   * @param { number } index - the pagination item number.
   * @param { Array<string> | null } pageInPath - if the page exists in the path.
   *
   * @return string
   */
  createLinkPath(existingPath: string, index: number, pageInPath: Array<string> | null): string {
    // Define the link path as an empty string prefix.
    let linkPath = '';

    // If we have the page path present in the current url, simply replace
    // the existing page number with the current page number.
    if (pageInPath) {
      linkPath = _.replace(existingPath, /page=\d+/g, `page=${index}`);
    } else {
      // If we already have a search parameter character in the path, simply
      // append the page parameter with an ampersand.
      if (existingPath.match(/^[?]/g)) {
        linkPath += `${existingPath}&page=${index}`;
      } else {
        // We don't have any search parameters in the path so add this as the
        // first.
        linkPath += `?page=${index}`;
      }
    }

    return linkPath;
  }

  /**
   * Updates the pager links.
   * @method updatePagerLinks
   *
   * @param { PagerProps } props - the pager properties.
   *
   */
  updatePagerLinks(props: PagerProps): void {
    // Define the pager links we'll be working with.
    const pagerLinks: Array<PagerLink> = [];
    let previousLink: PagerLink;
    let nextLink: PagerLink;
    let currentLink: PagerLink;
    // Check if the page parameter currently exists in the path.
    const pageInPath: Array<string> | null = props.currentPath.match(/[?,&]page=\d+/g);

    // If we only have a single page, exit.
    if (props.total_pages === 1) {
      return;
    }

    // Create the previous link.
    previousLink = {
      label: '<',
      value: this.createLinkPath(props.currentPath, props.current_page - 1, pageInPath),
    };

    // Create the next link.
    nextLink = {
      label: '>',
      value: this.createLinkPath(props.currentPath, props.current_page + 1, pageInPath),
    };

    // Create current link label for responsive pager
    const currentLinkLabel: string =
      this.state.windowWidth > Breakpoints.BREAKPOINT ? `${props.current_page + 1}` : `Page ${props.current_page + 1}`;

    currentLink = {
      label: currentLinkLabel,
      value: this.createLinkPath(props.currentPath, props.current_page, pageInPath),
    };

    // Loop through the total pages and add the pager links to the array.
    for (let i = 0; i < props.total_pages; i++) {
      // Define the current page we're working with.
      const pageNumber: number = i + 1;

      const linkPath: string = this.createLinkPath(props.currentPath, i, pageInPath);

      if (linkPath) {
        // Create current link label for responsive pager
        const pagerLinksLabel: string =
          this.state.windowWidth > Breakpoints.BREAKPOINT ? `${pageNumber}` : `Page ${pageNumber}`;

        // Add the pager link to the array.
        pagerLinks.push({
          label: pagerLinksLabel,
          value: linkPath,
        });
      }
    }

    this.setState({
      previousLink,
      nextLink,
      currentLink,
      links: pagerLinks,
    });
  }

  /**
   * Initiates navigation to the page provided.
   * @method navigatePage
   *
   * @param { PagerLink } pagerItem - the pager item to be navigated to.
   */
  navigatePage = (pagerItem: PagerLink): void => {
    this.props.updateQuery(pagerItem.value);
  };

  /**
   * Renders a link to be used for previous and next navigation.
   * @method renderLink
   *
   * @param { PagerLink } pagerItem - the pager item we should create the link for.
   * @param { Rotation } linkDirection - the direction for this pager link.
   *
   * @return React.ReactNode
   */
  renderLink(pagerItem: PagerLink, linkDirection: Rotation): React.ReactNode {
    // Define a flag to prevent link clicks when we don't have any further
    // pages to navigate to.
    let prevent = false;

    // Check if we should prevent a previous link navigation.
    if (linkDirection === Rotation.PREV && this.props.current_page - 1 < 0) {
      prevent = true;
    }

    // Check if we should prevent a next link navigation.
    if (linkDirection === Rotation.NEXT && this.props.current_page + 1 >= this.props.total_pages) {
      prevent = true;
    }

    // Define the arrow icon to be used for the pager direction.
    const arrow: JSX.Element = Icons.thinArrow(linkDirection);
    return (
      <div className={`block block--pager-navigation block--pager-navigation-${linkDirection} col s2`}>
        <Link
          to={pagerItem.value}
          title={pagerItem.label}
          className={prevent ? 'disabled' : ''}
          onClick={(clickEvent: React.SyntheticEvent<HTMLAnchorElement>) => {
            // If we should prevent a click, prevent the default and return.
            if (prevent) {
              clickEvent.preventDefault();
              return;
            }

            // Navigate the specified pager item value.
            this.navigatePage(pagerItem);
          }}
        >
          {arrow}
        </Link>
      </div>
    );
  }

  /**
   * Renders the Pager component element.
   * @method render
   *
   * @return React.ReactNode
   */
  render(): React.ReactNode {
    // If we don't have any properties, exit.
    if (!this.state.links) {
      return <Loading placeholder={PlaceholderType.PAGER} />;
    }

    // Create a previous and next link to be rendered.
    const previousLink: React.ReactNode = this.renderLink(this.state.previousLink, Rotation.PREV);
    const nextLink: React.ReactNode = this.renderLink(this.state.nextLink, Rotation.NEXT);

    return (
      <div className="block block--pager valign-wrapper row">
        {this.state.links.length > 0 && (
          <React.Fragment>
            {previousLink}
            <div className="block block--pager-numbers col s8">
              {this.state.windowWidth > 900 ? (
                <ul className="pagination">
                  <PagerNumber
                    links={this.state.links}
                    current_page={this.props.current_page}
                    updateQuery={this.props.updateQuery}
                  />
                </ul>
              ) : (
                <Select
                  value={this.state.currentLink}
                  className={'select select--pager'}
                  classNamePrefix={'sf'}
                  options={this.state.links}
                  isMulti={false}
                  onChange={(option?: PagerLink | Array<PagerLink> | null) => {
                    if (option && !Array.isArray(option)) {
                      this.navigatePage(option);
                    }
                  }}
                />
              )}
            </div>
            {nextLink}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Pager;
