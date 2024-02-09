export type UnionStatus = 'pending' | 'loading' | 'success' | 'error';

export type Season = {
  id: number;
  name: string;
  startDate?: Date;
  endDate?: Date;
};

export type Country = {
  countryId: number;
  countryName: string;
};

export type Faq = {
  faqId: number;
  question: string;
  answer: string;
};
