export interface IStoreState<T> {
  data: ModelState<T> | null;
  loading: boolean;
  error: any | null;
  paging?: number;
  pagesTotal?: number | null | undefined;
  editMode?: boolean;
}

export interface ModelState<T> {
  results?: T[];
  model: T;
}
