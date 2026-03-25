export interface IQueryParams {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  fields?: string;
  includes?: string;
  [key: string]: unknown;
}

export interface IQueryMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IQueryResult<T> {
  data: T[];
  meta: IQueryMeta;
}

export interface IQueryConfig {
  searchableFields?: string[];
  filterableFields?: string[];
  sortableFields?: string[];
  defaultSortBy?: string;
  defaultSortOrder?: "asc" | "desc";
  defaultLimit?: number;
  maxLimit?: number;
}

export interface PrismaFindManyArgs {
  where?: Record<string, unknown>;
  include?: Record<string, unknown>;
  select?: Record<string, boolean | Record<string, unknown>>;
  orderBy?: Record<string, unknown> | Record<string, unknown>[];
  skip?: number;
  take?: number;
}

export interface PrismaCountArgs {
  where?: Record<string, unknown>;
}

export interface PrismaModelDelegate {
  findMany(args?: unknown): Promise<unknown[]>;
  count(args?: unknown): Promise<number>;
}

export interface PrismaStringFilter {
  contains?: string;
  mode?: "insensitive" | "default";
  equals?: string;
  startsWith?: string;
  endsWith?: string;
  in?: string[];
  notIn?: string[];
  not?: string | PrismaStringFilter;
}

export interface PrismaNumberFilter {
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  equals?: number;
  in?: number[];
  notIn?: number[];
  not?: number | PrismaNumberFilter;
}

export interface PrismaWhereConditions extends Record<string, unknown> {
  OR?: Record<string, unknown>[];
  AND?: Record<string, unknown>[];
}
