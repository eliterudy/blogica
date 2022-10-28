import { To } from "react-router-dom";

export interface Article {
  _id: number;
  title: string;
  image_url: string;
  description: string;
  author: Author;
  isBookmarked?: boolean;
  created: string;
  updated?: string;
}

export interface Author extends Person {}

export interface ArticleDetails extends Article {
  numberOfLikes?: number;
  numberOfViews?: number;
  comments?: any;
}

export interface ContributorCardProps {
  contributor: Person;
  index: number;
}

export interface ArticleCardProps {
  article: Article;
  index: number;
  showAuthorDetails?: boolean;
}

export interface Person {
  _id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  username: string;
  bio?: string;
  image_url: string;
  created: string;
  updated?: string;
}

export interface User extends Person {
  saved: Saved;
  published: Published;
  favorites: Favorites;
}

export interface UserDetails extends Person {
  badges: BadgeDetails[];
  published: PublishedDetails;
  saved: SavedDetails;
  recents: RecentsDetails;
}

export interface AuthorDetails extends Person {
  badges: BadgeDetails[];
  published: Published;
}

export interface BadgeDetails {
  _id: number;
  badge: Badge;
  count: number;
}

export interface Badge {
  _id: number;
  title: string;
  image_url: string;
  badge_value: number;
  type: string;
  count: number;
}

/* User Detail Interfaces */
export interface SavedDetails {
  articles: Article[];
}
export interface RecentsDetails {
  articles: Article[];
  // authors: string[];
}
export interface PublishedDetails {
  articles: Article[];
}

/* User Interfaces */
export interface Saved {
  articles: string[];
}
export interface Recents {
  articles: string[];
  // authors: string[];
}
export interface Published {
  articles: string[];
}
export interface Favorites {
  articles: string[];
}

// Others
export interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: () => void;
}

export interface ArticleFilters {
  exchanges?: string[];
}
