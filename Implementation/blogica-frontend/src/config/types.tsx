import { To } from "react-router-dom";

export interface Article {
  _id: number;
  title: string;
  imageUrl: string;
  description: string;
  author: User;
  isBookmarked?: boolean;
  numberOfLikes?: number;
  numberOfViews?: number;
  comments?: any;
  created: string;
  updated: string;
}

export interface ArticleListElement extends Article {}

export interface ContributorListElement extends User {}

export interface ContributorCardProps {
  contributor: ContributorListElement;
  index: number;
  redirect: To;
}

export interface ArticleCardProps {
  article: ArticleListElement;
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
  bio: string;
  imageUrl: string;
  bookmarks: Bookmarks;
  published: Published;
  isAdmin: boolean;
  email: string;
  created: string;
  updated: string;
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
