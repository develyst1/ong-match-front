// Backend response shape for an "Ong" (Tribe) category.

export interface TribeResponse {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  emoji: string;
  color: string;
  description: string;
  memberCount: number;
}
