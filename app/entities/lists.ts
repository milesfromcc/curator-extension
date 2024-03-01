export interface ContentList {
  guid: string;
  name: string;
  description: string;
  photoURL: string;
  ownerUid: string;
  createdAt: string; // ISO 8601
  lastUpdatedAt: string; // ISO 8601
}

export enum CurationType {
  Custom = 0,
  Favorites = 1,
  Queued = 2,
  History = 3,
  MarkedAsRead = 4,
}

export enum CurationVisibility {
  Private = 0,
  Public = 1,
  OnlyWithLink = 2,
  Featured = 3,
}

export enum FeedType {
  Custom = 0,
  MyFeed = 1,
}

export enum FeedVisibility {
  Private = 0,
  Public = 1,
}

export interface Feed extends ContentList {
  feedType: FeedType;
  visibility: FeedVisibility;
}

export interface Curation extends ContentList {
  curationType: CurationType;
  visibility: CurationVisibility;
  customSlug?: string;
}
