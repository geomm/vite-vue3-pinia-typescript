export interface IStoreState<T> {
  data: ModelState<T> | null;
  loading: boolean;
  error: any | null;
  paging?: number;
  pagesTotal?: number | null | undefined;
}

export interface ModelState<T> {
  results?: T[];
  model: T;
}
