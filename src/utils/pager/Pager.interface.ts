/**
 * Pager.interface.ts
 * Interface for the pager component.
 */
'use strict';

export interface PagerData {
  current_page: number;
  items_per_page: number;
  total_items: string;
  total_pages: number;
}

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
  current_page: string;
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
}
