export type EditableModelProperties = 'name' | 'gender' | 'species';

export interface IStoreState<T> {
  data: ModelState<T> | null;
  loading: boolean;
  error: any | null;
  paging: number;
  pagesTotal: number | null | undefined;
  totalCount?: number | null | undefined;
  editMode?: boolean;
  items?: T[];
}

export interface ModelState<T> {
  results?: T[];
  model: T;
}
