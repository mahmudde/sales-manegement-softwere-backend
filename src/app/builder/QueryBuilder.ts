import {
  IQueryConfig,
  IQueryParams,
  IQueryResult,
  PrismaCountArgs,
  PrismaFindManyArgs,
  PrismaModelDelegate,
  PrismaNumberFilter,
  PrismaStringFilter,
  PrismaWhereConditions,
} from "../interfaces/query.interface";

export class QueryBuilder<
  T,
  TWhereInput = Record<string, unknown>,
  TInclude = Record<string, unknown>,
> {
  private query: PrismaFindManyArgs;
  private countQuery: PrismaCountArgs;
  private page = 1;
  private limit = 10;
  private skip = 0;
  private sortBy = "createdAt";
  private sortOrder: "asc" | "desc" = "desc";
  private selectFields: Record<string, boolean | undefined> = {};

  constructor(
    private model: PrismaModelDelegate,
    private queryParams: IQueryParams,
    private config: IQueryConfig = {},
  ) {
    this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: this.config.defaultLimit ?? 10,
    };

    this.countQuery = {
      where: {},
    };
  }

  search(): this {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;

    if (!searchTerm || !searchableFields || searchableFields.length === 0) {
      return this;
    }

    const searchConditions: Record<string, unknown>[] = searchableFields.map(
      (field) => {
        if (field.includes(".")) {
          return this.buildNestedCondition(field, {
            contains: searchTerm,
            mode: "insensitive",
          });
        }

        const stringFilter: PrismaStringFilter = {
          contains: searchTerm,
          mode: "insensitive",
        };

        return {
          [field]: stringFilter,
        };
      },
    );

    const queryWhere = this.query.where as PrismaWhereConditions;
    const countWhere = this.countQuery.where as PrismaWhereConditions;

    queryWhere.OR = [...(queryWhere.OR ?? []), ...searchConditions];
    countWhere.OR = [...(countWhere.OR ?? []), ...searchConditions];

    return this;
  }

  filter(): this {
    const { filterableFields } = this.config;

    const excludedFields = [
      "searchTerm",
      "page",
      "limit",
      "sortBy",
      "sortOrder",
      "fields",
      "includes",
    ];

    const filterParams: Record<string, unknown> = {};

    Object.keys(this.queryParams).forEach((key) => {
      if (!excludedFields.includes(key)) {
        const value = this.queryParams[key];
        if (value !== undefined && value !== "") {
          filterParams[key] = value;
        }
      }
    });

    const queryWhere = this.query.where as Record<string, unknown>;
    const countQueryWhere = this.countQuery.where as Record<string, unknown>;

    Object.keys(filterParams).forEach((key) => {
      const value = filterParams[key];

      const isAllowedField =
        !filterableFields ||
        filterableFields.length === 0 ||
        filterableFields.includes(key);

      if (!isAllowedField) {
        return;
      }

      const parsedValue =
        typeof value === "object" && value !== null && !Array.isArray(value)
          ? this.parseRangeFilter(
              value as Record<string, string | number | (string | number)[]>,
            )
          : this.parseFilterValue(value);

      if (key.includes(".")) {
        const nestedCondition = this.buildNestedCondition(key, parsedValue);
        this.query.where = this.deepMerge(queryWhere, nestedCondition);
        this.countQuery.where = this.deepMerge(
          countQueryWhere,
          nestedCondition,
        );
      } else {
        queryWhere[key] = parsedValue;
        countQueryWhere[key] = parsedValue;
      }
    });

    return this;
  }

  paginate(): this {
    const defaultLimit = this.config.defaultLimit ?? 10;
    const maxLimit = this.config.maxLimit ?? 100;

    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || defaultLimit;

    this.page = page < 1 ? 1 : page;
    this.limit = limit > maxLimit ? maxLimit : limit < 1 ? defaultLimit : limit;
    this.skip = (this.page - 1) * this.limit;

    this.query.skip = this.skip;
    this.query.take = this.limit;

    return this;
  }

  sort(): this {
    const defaultSortBy = this.config.defaultSortBy ?? "createdAt";
    const defaultSortOrder = this.config.defaultSortOrder ?? "desc";

    const requestedSortBy =
      typeof this.queryParams.sortBy === "string"
        ? this.queryParams.sortBy
        : defaultSortBy;

    const requestedSortOrder =
      this.queryParams.sortOrder === "asc" ? "asc" : defaultSortOrder;

    const isAllowedSortField =
      !this.config.sortableFields ||
      this.config.sortableFields.length === 0 ||
      this.config.sortableFields.includes(requestedSortBy);

    this.sortBy = isAllowedSortField ? requestedSortBy : defaultSortBy;
    this.sortOrder = requestedSortOrder;

    if (this.sortBy.includes(".")) {
      this.query.orderBy = this.buildNestedCondition(
        this.sortBy,
        this.sortOrder,
      );
    } else {
      this.query.orderBy = {
        [this.sortBy]: this.sortOrder,
      };
    }

    return this;
  }

  fields(): this {
    const fieldsParam = this.queryParams.fields;

    if (fieldsParam && typeof fieldsParam === "string") {
      const fieldsArray = fieldsParam
        .split(",")
        .map((field) => field.trim())
        .filter(Boolean);

      this.selectFields = {};

      fieldsArray.forEach((field) => {
        this.selectFields[field] = true;
      });

      this.query.select = this.selectFields as Record<
        string,
        boolean | Record<string, unknown>
      >;

      delete this.query.include;
    }

    return this;
  }

  include(relation: TInclude): this {
    if (Object.keys(this.selectFields).length > 0) {
      return this;
    }

    this.query.include = {
      ...(this.query.include as Record<string, unknown>),
      ...(relation as Record<string, unknown>),
    };

    return this;
  }

  dynamicInclude(
    includeConfig: Record<string, unknown>,
    defaultInclude: string[] = [],
  ): this {
    if (Object.keys(this.selectFields).length > 0) {
      return this;
    }

    const result: Record<string, unknown> = {};

    defaultInclude.forEach((field) => {
      if (includeConfig[field]) {
        result[field] = includeConfig[field];
      }
    });

    const includeParam = this.queryParams.includes;

    if (includeParam && typeof includeParam === "string") {
      const requestedRelations = includeParam
        .split(",")
        .map((relation) => relation.trim())
        .filter(Boolean);

      requestedRelations.forEach((relation) => {
        if (includeConfig[relation]) {
          result[relation] = includeConfig[relation];
        }
      });
    }

    this.query.include = {
      ...(this.query.include as Record<string, unknown>),
      ...result,
    };

    return this;
  }

  where(condition: TWhereInput): this {
    this.query.where = this.deepMerge(
      this.query.where as Record<string, unknown>,
      condition as Record<string, unknown>,
    );

    this.countQuery.where = this.deepMerge(
      this.countQuery.where as Record<string, unknown>,
      condition as Record<string, unknown>,
    );

    return this;
  }

  async execute(): Promise<IQueryResult<T>> {
    const [total, data] = await Promise.all([
      this.model.count(
        this.countQuery as Parameters<typeof this.model.count>[0],
      ),
      this.model.findMany(
        this.query as Parameters<typeof this.model.findMany>[0],
      ),
    ]);

    const totalPages = Math.ceil(total / this.limit);

    return {
      data: data as T[],
      meta: {
        page: this.page,
        limit: this.limit,
        total,
        totalPages,
      },
    };
  }

  async count(): Promise<number> {
    return await this.model.count(
      this.countQuery as Parameters<typeof this.model.count>[0],
    );
  }

  getQuery(): PrismaFindManyArgs {
    return this.query;
  }

  private buildNestedCondition(
    path: string,
    value: unknown,
  ): Record<string, unknown> {
    const keys = path.split(".");
    return keys.reverse().reduce<Record<string, unknown>>(
      (acc, key) => {
        return { [key]: acc };
      },
      value as Record<string, unknown>,
    );
  }

  private deepMerge(
    target: Record<string, unknown>,
    source: Record<string, unknown>,
  ): Record<string, unknown> {
    const result = { ...target };

    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        if (
          result[key] &&
          typeof result[key] === "object" &&
          !Array.isArray(result[key])
        ) {
          result[key] = this.deepMerge(
            result[key] as Record<string, unknown>,
            source[key] as Record<string, unknown>,
          );
        } else {
          result[key] = source[key];
        }
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }

  private parseFilterValue(value: unknown): unknown {
    if (value === "true") {
      return true;
    }

    if (value === "false") {
      return false;
    }

    if (typeof value === "string" && value.includes(",")) {
      return {
        in: value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
          .map((item) => this.parseFilterValue(item)),
      };
    }

    if (typeof value === "string" && !isNaN(Number(value)) && value !== "") {
      return Number(value);
    }

    if (Array.isArray(value)) {
      return {
        in: value.map((item) => this.parseFilterValue(item)),
      };
    }

    return value;
  }

  private parseRangeFilter(
    value: Record<string, string | number | (string | number)[]>,
  ): PrismaNumberFilter | PrismaStringFilter | Record<string, unknown> {
    const rangeQuery: Record<string, unknown> = {};

    Object.keys(value).forEach((operator) => {
      const operatorValue = value[operator];

      switch (operator) {
        case "lt":
        case "lte":
        case "gt":
        case "gte":
        case "equals":
        case "not":
        case "contains":
        case "startsWith":
        case "endsWith": {
          const parsedValue =
            typeof operatorValue === "string" && !isNaN(Number(operatorValue))
              ? Number(operatorValue)
              : operatorValue;

          if (!Array.isArray(parsedValue)) {
            rangeQuery[operator] = parsedValue;
          }

          break;
        }

        case "in":
        case "notIn":
          if (Array.isArray(operatorValue)) {
            rangeQuery[operator] = operatorValue;
          } else {
            const parsedValue =
              typeof operatorValue === "string" && !isNaN(Number(operatorValue))
                ? Number(operatorValue)
                : operatorValue;

            rangeQuery[operator] = [parsedValue];
          }
          break;

        default:
          break;
      }
    });

    return Object.keys(rangeQuery).length > 0 ? rangeQuery : value;
  }
}
