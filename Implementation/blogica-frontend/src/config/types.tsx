import { To } from "react-router-dom";

export interface Article {
  _id: number;
  title: string;
  image_url: string;
  description: string;
  author: Author;
  isBookmarked?: boolean;
  createdAt?: string; // remove ?  later
  updatedAt?: string; // remove ?  later
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
  image_url: string;
  bio: string;
  username: string;
  createdAt: string;
  updatedAt?: string;
}

export interface User extends Person {
  saved: Saved;
  published: Published;
  favorites: Favorites;
}

export interface UserDetailSegment {
  published: PublishedDetails;
  saved: SavedDetails;
  recents: RecentsDetails;
}
export interface UserDetails extends Person, UserDetailSegment {
  badges: Award[];
  points_earned: number;
  points_spent: number;
}

export interface AuthorDetails extends Person {
  badges: Award[];
  published: PublishedDetails;
}

export interface Award {
  title: string;
  image_url: string;
  description: string;
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
