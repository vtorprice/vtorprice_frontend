import {
  IAppSelect,
  ISelectValue,
} from '../types';

export interface IAsyncSelect<T = any>
  extends Omit<IAppSelect<T>, 'data'> {
  loadData: (
    queryString: string
  ) => Promise<
  Array<ISelectValue<T>>
  >;
}
