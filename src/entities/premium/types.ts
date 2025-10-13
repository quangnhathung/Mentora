export type Benefit = {
  id: number;
  title?: string;
  img?: string;
  desc?: string;
  content?: string[];
};

export type Plan = {
  id: number;
  expireTime?: string;
  value: number;
  sale?: string;
  outstanding?: boolean;
  oldPrice?: string;
  newPrice?: string;
};

export type BenefitResponse = { data: Benefit };
export type BenefitListResponse = { data: Benefit[] } & {
  offset: 1;
  limit: 10;
  count: 100;
};

export type PlanResponse = { data: Plan };
export type PlanListResponse = { data: Plan[] } & {
  offset: 1;
  limit: 10;
  count: 100;
};
