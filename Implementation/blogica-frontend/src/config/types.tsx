import { To } from "react-router-dom";

export interface Article {
  _id: number;
  title: string;
  image_url: string;
  description: string;
  author: Author;
  createdAt?: string; // remove ?  later
}

export interface ArticleDetails extends Article {
  numberOfLikes: number;
  numberOfViews: number;
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
}

export interface UserArticleSegment {
  saved: string[];
  published: string[];
  favorites: string[];
  drafts: string[];
}

export interface Author extends Person {}

export interface User extends Person {
  articles: UserArticleSegment;
}

export interface PersonDetailArticleSegment {
  published: Article[];
}

export interface AuthorDetailArticleSegment
  extends PersonDetailArticleSegment {}

export interface UserDetailArticleSegment extends PersonDetailArticleSegment {
  saved: Article[];
  recents: Article[];
  drafts: Article[];
}

export interface UserDetails extends Person {
  badges: Award[];
  points_earned: number;
  points_spent: number;
  articles: UserDetailArticleSegment;
}

export interface AuthorDetails extends Person {
  badges: Award[];
  articles: AuthorDetailArticleSegment;
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

// Others
export interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: () => void;
}

export interface ArticleFilters {
  exchanges?: string[];
}
