export type UnionStatus = 'pending' | 'loading' | 'success' | 'error';

export type Season = {
  id: number;
  season: string;
  startDate?: Date;
  endDate?: Date;
};

export type Country = {
  countryId?: number;
  countryName: string;
};
