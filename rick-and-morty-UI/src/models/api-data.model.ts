export interface IApiDataModel<T> {
  info: IApiDataPaging;
  results: T[];
}

interface IApiDataPaging {
  count: number;
  pages: number;
  next: string;
  prev: string;
}
