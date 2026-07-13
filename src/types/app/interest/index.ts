// Frontend domain type for a sub-interest inside a Tribe.

export interface Interest {
  id: string;
  tribeId: string;
  name: string;
  emoji?: string;
}

export interface InterestListParams {
  tribeId?: string;
}
