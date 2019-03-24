/**
 * Loading.tsx
 * Loading component.
 */
'use strict';

// Import the dependent modules.
import * as React from 'react';
// const spin = require('./loading-spin.svg');

// Import the dependent enumerators.
import { PlaceholderType } from './Loading.enum';

// Import the dependent interfaces.
import { LoadingProps, LoadingState } from './Loading.interface';

// Import the dependent styles.
import './Loading.css';

class Loading extends React.Component<LoadingProps, LoadingState> {
  // Declare the component state.
  state: LoadingState;

  /**
   * Initialize the component with the parent properties.
   * @constructor
   */
  constructor(props: LoadingProps) {
    super(props);

    this.state = {
      placeholder: this.props.placeholder ? this.props.placeholder : PlaceholderType.TEXT,
    };
  }

  /**
   * Defines the event list placeholder.
   * @method getEventList
   *
   * @return React.ReactNode
   */
  getEventList(): React.ReactNode {
    return (
      <React.Fragment>
        <rect x="0" y="0.05" width="0.25" height="0.3" />
        <rect x="0.3" y="0.07" width="0.5" height="0.03" />
        <rect x="0.3" y="0.13" width="0.6" height="0.03" />
        <rect x="0.3" y="0.21" width="0.1" height="0.03" />
        <rect x="0.43" y="0.21" width="0.1" height="0.03" />
        <rect x="0.56" y="0.21" width="0.1" height="0.03" />
        <rect x="0" y="0.39" width="0.25" height="0.3" />
        <rect x="0.3" y="0.41" width="0.5" height="0.03" />
        <rect x="0.3" y="0.47" width="0.6" height="0.03" />
        <rect x="0.3" y="0.55" width="0.1" height="0.03" />
        <rect x="0.43" y="0.55" width="0.1" height="0.03" />
        <rect x="0.56" y="0.55" width="0.1" height="0.03" />
        <rect x="0" y="0.73" width="0.25" height="0.3" />
        <rect x="0.3" y="0.75" width="0.5" height="0.03" />
        <rect x="0.3" y="0.81" width="0.6" height="0.03" />
        <rect x="0.3" y="0.89" width="0.1" height="0.03" />
        <rect x="0.43" y="0.89" width="0.1" height="0.03" />
        <rect x="0.56" y="0.89" width="0.1" height="0.03" />
      </React.Fragment>
    );
  }

  /**
   * Defines the hero image placeholder.
   * @method getSVGText
   *
   * @return React.ReactNode
   */
  getImage(): React.ReactNode {
    return (
      <React.Fragment>
        <rect x="0" y="0" width="1" height="1" />
      </React.Fragment>
    );
  }

  /**
   * Defines the news list placeholder.
   * @method getNewsList
   *
   * @return React.ReactNode
   */
  getNewsList(): React.ReactNode {
    return (
      <React.Fragment>
        <rect x="0.5" y="0.05" width="0.5" height="0.45" />
        <rect x="0" y="0.05" width="0.45" height="0.03" />
        <rect x="0" y="0.20" width="0.45" height="0.03" />
        <rect x="0" y="0.25" width="0.35" height="0.03" />
        <rect x="0" y="0.55" width="0.3" height="0.2" />
        <rect x="0" y="0.78" width="0.26" height="0.03" />
        <rect x="0" y="0.83" width="0.24" height="0.03" />
        <rect x="0.35" y="0.55" width="0.3" height="0.2" />
        <rect x="0.35" y="0.78" width="0.26" height="0.03" />
        <rect x="0.35" y="0.83" width="0.24" height="0.03" />
        <rect x="0.7" y="0.55" width="0.3" height="0.2" />
        <rect x="0.7" y="0.78" width="0.27" height="0.03" />
        <rect x="0.7" y="0.83" width="0.25" height="0.03" />
      </React.Fragment>
    );
  }

  /**
   * Defines the side menu placeholder.
   * @method getSideMenu
   *
   * @return React.ReactNode
   */
  getSideMenu(): React.ReactNode {
    return (
      <React.Fragment>
        <circle cx="0.05" cy="0.07" r="0.03" />
        <rect x="0.15" y="0.05" width="0.7" height="0.04" />
        <circle cx="0.05" cy="0.19" r="0.03" />
        <rect x="0.15" y="0.17" width="0.6" height="0.04" />
        <circle cx="0.05" cy="0.31" r="0.03" />
        <rect x="0.15" y="0.29" width="0.75" height="0.04" />
        <circle cx="0.05" cy="0.43" r="0.03" />
        <rect x="0.15" y="0.41" width="0.7" height="0.04" />
      </React.Fragment>
    );
  }

  /**
   * Defines the text placeholder.
   * @method getSVGText
   *
   * @return React.ReactNode
   */
  getText(): React.ReactNode {
    return (
      <React.Fragment>
        <rect x="0" y="0.05" width="0.9" height="0.06" />
        <rect x="0" y="0.15" width="1" height="0.06" />
        <rect x="0" y="0.25" width="1" height="0.06" />
        <rect x="0" y="0.35" width="0.6" height="0.06" />
        <rect x="0" y="0.55" width="1" height="0.06" />
        <rect x="0" y="0.65" width="1" height="0.06" />
        <rect x="0" y="0.75" width="1" height="0.06" />
        <rect x="0" y="0.85" width="0.4" height="0.06" />
      </React.Fragment>
    );
  }

  /**
   * Sets the SVG element to be injected into the placeholder.
   * @method setSVGPlaceholder
   *
   * @param { PlaceholderType } placeholder - the type of placeholder to display.
   *
   * @return JSX.Element
   */
  setSVGPlaceholder(placeholder: PlaceholderType): React.ReactNode {
    let svg: React.ReactNode;

    switch (placeholder) {
      case PlaceholderType.EVENT_LIST:
        svg = this.getEventList();
        break;
      case PlaceholderType.NEWS_LIST:
        svg = this.getNewsList();
        break;
      case PlaceholderType.SIDE_MENU:
        svg = this.getSideMenu();
        break;
      case PlaceholderType.TEXT:
        svg = this.getText();
        break;
      case PlaceholderType.HEADER_IMAGE:
      case PlaceholderType.PAGER:
      case PlaceholderType.SIDE_BANNER:
      case PlaceholderType.TOP_BANNER:
        svg = this.getImage();
        break;
      default:
        svg = this.getImage();
        break;
    }

    return (
      <React.Fragment>
        <defs>
          <clipPath id={`svg-${placeholder}`} clipPathUnits="objectBoundingBox">
            {svg}
          </clipPath>
        </defs>
      </React.Fragment>
    );
  }

  /**
   * Render the membership wizard jsx.
   */
  render() {
    // Define the placeholder to be used.
    const placeholder: React.ReactNode = this.setSVGPlaceholder(this.state.placeholder);

    return (
      <React.Fragment>
        <div className="loading">
          <div className={`loading-placeholder ${this.state.placeholder}`} />
        </div>
        <svg className="placeholder-svg" width="0" height="0">
          {placeholder}
        </svg>
      </React.Fragment>
    );

    // return (
    // <React.Fragment>
    // <div className="loading">
    // <div
    // className={`loading-placeholder ${this.state.placeholder}`}
    /// >
    // </div>
    // <div>Loading</div>
    // </React.Fragment>

    // );
  }
}

export default Loading;
