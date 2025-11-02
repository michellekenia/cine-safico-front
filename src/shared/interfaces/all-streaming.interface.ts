export interface StreamingPlatformItem {
  slug: string;
  nome: string;
  count: number;
}

export interface StreamingPlatformsResponse {
  items: StreamingPlatformItem[];
  total: number;
}