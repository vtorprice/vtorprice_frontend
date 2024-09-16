import { createEffect, createStore } from 'effector';
import { AxiosError } from 'axios';
import { createLoaderStore } from '@box/shared/lib/helpers';
import { IExchangeRecyclable } from './types';
import { exchangeRecyclableApi } from '../api';

const getExchangeRecyclablesFx = createEffect<
Parameters<typeof exchangeRecyclableApi.getExchangeRecyclables>[0],
{
  data: Awaited<ReturnType<typeof exchangeRecyclableApi.getExchangeRecyclables>>['data'],
  page?: number
},
AxiosError    
>({
  handler: async (params) => {
    const { data } = await exchangeRecyclableApi.getExchangeRecyclables(params);
    return {
      data,
      page: params.page
    };
  }
});

const exchangeRecyclablesLoading = createLoaderStore(false, getExchangeRecyclablesFx);

const $exchangeRecyclables = createStore<Array<IExchangeRecyclable>>([])
  .on(getExchangeRecyclablesFx.doneData, (state, data) => {
    if (data.page && data.page > 1) {
      return [
        ...state,
        ...data.data.results,
      ];
    }
    return data.data.results;
  });

export {
  getExchangeRecyclablesFx,
  $exchangeRecyclables,
  exchangeRecyclablesLoading
};
