export interface IStoreState<T> {
  data: T[] | T | null;
  loading: boolean;
  error: any | null;
  paging?: number;
}
