export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string; // Made content optional
  date: string;
  readTime: string;
  category: string;
}
