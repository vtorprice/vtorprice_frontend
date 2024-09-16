import { createEffect, createStore } from 'effector';
import { AxiosError } from 'axios';
import { recyclableApi } from '@box/entities/recyclable/api';
import { IRecyclable } from './types';

const getRecyclableFx = createEffect<number, IRecyclable, AxiosError>({
  handler: async (id) => {
    const { data } = await recyclableApi.getRecyclable(id);
    return data;
  }
});

const $recyclable = createStore<IRecyclable | null>(null)
  .on(getRecyclableFx.doneData, (_, data) => data);

export {
  $recyclable,
  getRecyclableFx
};
