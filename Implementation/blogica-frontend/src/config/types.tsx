import { To } from "react-router-dom";

export interface Article {
  _id: number;
  title: string;
  imageUrl: string;
  description: string;
  author: User;
  isBookmarked?: boolean;
  numberOfLikes: number;
  numberOfViews?: number;
  comments?: any;
  created: string;
  updated: string;
}

export interface ArticleListElement {
  _id: number;
  title: string;
  imageUrl: string;
  description: string;
  author: User;
  isBookmarked?: boolean;
  created: string;
  updated: string;
}

export interface ArticleCardProps {
  article: ArticleListElement | null;
  index: number;
  redirect: To;
}

export interface Bookmarks {
  articles: string[];
}

export interface Recents {
  articles: string[];
}
export interface Published {
  articles: string[];
}

export interface User {
  _id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  username: string;
  bookmarks: Bookmarks;
  published: Published;
  isAdmin: boolean;
  email: string;
}

export interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: () => void;
}

export interface ArticleFilters {
  cuisine?: string[];
  course?: string[];
  diet?: string[];
  servings?: string[];
}
