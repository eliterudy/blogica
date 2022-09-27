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

export interface ArticleDetail extends Article {
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
  bio: string;
  image_url: string;
  created: string;
  updated?: string;
}

export interface User extends Person {
  bookmarks?: Bookmarks;
  published: Published;
  recents?: Recents;
  currency?: string;
  currency_type?: string;
}

export interface Author extends Person {}

export interface AuthorDetail extends Person {
  published: Published;
}

export interface Bookmarks {
  articles: string[];
}

export interface Recents {
  articles: string[];
  authors: string[];
}

export interface Published {
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
