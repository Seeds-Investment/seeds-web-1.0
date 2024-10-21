export interface SeedspediaArticle {
  data: ArticleI[];
  metadata: Metadata;
}

export interface ArticleI {
  id: string;
  title: string;
  author: string;
  author_id: string;
  link: string;
  videoUrl: string;
  imageUrl: string;
  content: string;
  source: string;
  language: string;
  category: string;
  publicationDate: string;
  peoples: People[];
  circles: Circle[];
  assets: Asset[];
  status: string;
  total_likes: number;
  total_comments: number;
  total_shares: number;
  total_views: number;
  is_liked: boolean;
  meta_title: string;
  meta_description: string;
  updated_at: string;
}

export interface People {
  id: string;
  name: string;
}

export interface Circle {
  id: string;
  name: string;
}

export interface Asset {
  id: string;
  name: string;
}

export interface Metadata {
  total: number;
  current_page: number;
  limit: number;
  total_page: number;
}
