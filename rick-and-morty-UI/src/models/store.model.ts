export interface IStoreState<T> {
  data: ModelState<T> | null;
  loading: boolean;
  error: any | null;
  paging?: number;
  pageActive?: number;
  pageTotal?: number
}

export interface ModelState<T> {
  results?: T[];
  model: T;
}
