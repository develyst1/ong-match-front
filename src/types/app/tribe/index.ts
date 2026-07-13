// Frontend domain type for a Tribe ("องค์" / Ong category).

export interface Tribe {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  color: string; // Mantine color name (e.g. "green", "grape")
  description: string;
  memberCount: number;
}

export type ModalMode = "create" | "edit" | "view";
