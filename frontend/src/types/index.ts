import type { ReactNode } from 'react';

export type User = {
  id: number;
  email: string;
  is_active: boolean;
  created_at: string;
};

export type Photo = {
  id: number;
  pexels_id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src_original: string;
  src_large2x: string;
  src_large: string;
  src_medium: string;
  src_small: string;
  src_portrait: string;
  src_landscape: string;
  src_tiny: string;
  like_count: number;
  is_liked: boolean;
  alt: string;
};

export type PhotoLikeResponse = {
  message: string;
  liked: boolean;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  loading: boolean;
};
