export interface IPageHeadBuilder {
  title: string;
  description: string;
  url?: string;
  imageUrl?: string | null;
  canonical?: string;
  noIndex?: boolean;
  height?: number;
  width?: number;
}

export interface IPageViewDataLayer {
  pageURL: string;
  pagePath: string;
  pageTitle: string;
  searchedLocation?: string;
}
