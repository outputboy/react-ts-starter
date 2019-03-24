/**
 * Pager.interface.ts
 * Interface for the pager component.
 */
'use strict';

/**
 * Page links interface.
 */
export interface PagerLink {
  label: string;
  value: string;
}

/**
 * Pager properties interface.
 */
export interface PagerProps {
  current_page: number;
  total_items: number;
  total_pages: number;
  items_per_page: number;
  currentPath: string;
  updateQuery: Function;
}

/**
 * Pager state interface.
 */
export interface PagerState {
  links: Array<PagerLink>;
  previousLink: PagerLink;
  nextLink: PagerLink;
  currentLink: PagerLink;
  windowWidth: number;
}

/**
 * Pager number properties interface.
 */
export interface PagerNumberProps {
  current_page: number;
  links: Array<PagerLink>;
  updateQuery: Function;
}
