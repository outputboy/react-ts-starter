/**
 * Icons.model.ts
 * Icons model class.
 */
'use strict';
import * as React from 'react';

// Import the dependent enumerators.
import { Rotation } from './Icons.enum';

/**
 * Static icons class.
 * @class Icons
 */
export default class Icons {
  /**
   * Thin arrow Icon.
   * @method arrow
   *
   * @param { Rotation } rotation - the rotation of the icon.
   *
   * @return JSX.Element
   */
  public static thinArrow(rotation: Rotation): JSX.Element {

    let rotateRule: string = '0';

    switch (rotation) {
      case Rotation.PREV:
        rotateRule = '180';
        break;
      case Rotation.UP:
        rotateRule = '-90';
        break;
      case Rotation.DOWN:
        rotateRule = '90';
        break;
      default:
        rotateRule = '0';
    }

    const arrowStyle: React.CSSProperties = {
      transform: `rotate(${rotateRule}deg)`
    };

    return (
      <svg
        viewBox="0 0 129 129"
        className={`icon icon-${rotation}-arrow`}
        style={arrowStyle}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="m 40.4 121.3 c -0.8 0.8 -1.8 1.2 -2.9 1.2 s -2.1 -0.4 -2.9 
             -1.2 c -1.6 -1.6 -1.6 -4.2 0 -5.8 l 51 -51 l -51 -51 c -1.6 
             -1.6 -1.6 -4.2 0 -5.8 c 1.6 -1.6 4.2 -1.6 5.8 0 l 53.9 53.9 
             c 1.6 1.6 1.6 4.2 0 5.8 l -53.9 53.9 Z"
        />
      </svg>
    );
  }

  /**
   * Thick arrow Icon.
   * @method arrow
   *
   * @param { Rotation } rotation - the rotation of the icon.
   *
   * @return JSX.Element
   */
  public static thickArrow(rotation: Rotation): JSX.Element {
    let rotateRule: string = '0';

    switch (rotation) {
      case Rotation.PREV:
        rotateRule = '180';
        break;
      case Rotation.UP:
        rotateRule = '-90';
        break;
      case Rotation.DOWN:
        rotateRule = '90';
        break;
      default:
        rotateRule = '0';
    }

    const arrowStyle: React.CSSProperties = {
      transform: `rotate(${rotateRule}deg)`
    };

    return (
      <svg
        viewBox="0 0 451.846 451.847"
        style={arrowStyle}
        className={`icon icon-${rotation}-arrow`}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M 345.441 248.292 L 151.154 442.573 c -12.359 12.365 -32.397 
             12.365 -44.75 0 c -12.354 -12.354 -12.354 -32.391 0 -44.744 L 
             278.318 225.92 L 106.409 54.017 c -12.354 -12.359 -12.354 -32.394 
             0 -44.748 c 12.354 -12.359 32.391 -12.359 44.75 0 l 194.287 194.284 
             c 6.177 6.18 9.262 14.271 9.262 22.366 C 354.708 234.018 351.617 
             242.115 345.441 248.292 Z"
        />
      </svg>
    );
  }

  /**
   * Angled rectangle.
   * @method angledRectangle
   *
   * @return JSX.Element
   */
  public static angledRectangle(): JSX.Element {
    return (
      <svg
        viewBox="0 0 389 75"
        className={`icon icon-angled-rectangle`}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <polygon
          id="Rectangle"
          fill="#FDDC00"
          fillRule="nonzero"
          transform="translate(194.667945, 37.500000) scale(-1, -1) translate(-194.667945, -37.500000) "
          points="89.948263 0 389.335889 0 389.335889 75 0 75"
        />
      </svg>
    );
  }
}
