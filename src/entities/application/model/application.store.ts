import { createEffect, createEvent, createStore, sample } from "effector";
import { IRecyclableApplication } from "@box/entities/application/model/types";
import { AxiosError } from "axios";
import { applicationApi, applicationModel } from "@box/entities/application";
import { createLoaderStore } from "@box/shared/lib/helpers";
import Router from 'next/router';
import { notificationModel } from '@box/entities/notification';

const getApplicationFx = createEffect<
  Parameters<typeof applicationApi.getApplication>[0],
  IRecyclableApplication,
  AxiosError
>({
  handler: async (id) => {
    const { data } = await applicationApi.getApplication(id);

    return data;
  },
});
const getApplicationsFx = createEffect<
  Parameters<typeof applicationApi.getApplications>[0],
  {
    data: Awaited<ReturnType<typeof applicationApi.getApplications>>["data"];
    page?: number;
  },
  AxiosError
>({
  handler: async (params) => {
    const { data } = await applicationApi.getApplications(params);

    return {
      data,
      page: params.page,
    };
  },
});

const applicationsLoading = createLoaderStore(false, getApplicationsFx);

const updateApplicationEvent =
  createEvent<Parameters<typeof applicationApi.setApplication>[0]>();

const updateApplicationFx = createEffect<
  Parameters<typeof applicationApi.setApplication>[0],
  applicationModel.IRecyclableApplication,
  AxiosError
>({
  handler: async (params) => {
    const { data } = await applicationApi.setApplication(params);
    Router.back()
    return data;
  },
});

const updateIsFavoriteApplicationFx = createEffect<
  Parameters<typeof applicationApi.updateApplicationInFavorite>[0],
  applicationModel.IRecyclableApplication,
  AxiosError
>({
  handler: async (params) => {
    const { data } = await applicationApi.updateApplicationInFavorite(params);
    return data;
  },
});

const deleteApplicationFx = createEffect<number, number | null, AxiosError>({
  handler: async (id) => {
    await applicationApi.deleteApplication(id);
    return id;
  },
});

const resetApplicationsListEvent = createEvent();

const $applications = createStore<Array<IRecyclableApplication>>([])
  .on(getApplicationsFx.doneData, (state, data) => {
    if (data.page && data.page > 1) {
      return [...state, ...data.data.results];
    }
    return data.data.results;
  })
  .on(updateApplicationFx.doneData, (state, data) => {
    const newState = [...state];
    const updatedApplicationIndex = newState.findIndex(
      (el) => el.id === data.id
    );
    if (updatedApplicationIndex) {
      newState[updatedApplicationIndex] = data;
    }
    return newState;
  })
  .on(updateIsFavoriteApplicationFx.doneData, (state, data) => {
    const newState = [...state];
    const updatedApplicationIndex = newState.findIndex(
      (el) => el.id === data.id
    );
    if (updatedApplicationIndex) {
      newState[updatedApplicationIndex] = data;
    }
    return newState;
  })
  .on(deleteApplicationFx.doneData, (store, id) =>
    id !== null ? store.filter((el) => el.id !== id) : store
  )
  .on(getApplicationsFx.failData, () => [])
  .reset(resetApplicationsListEvent);

const $application = createStore<IRecyclableApplication | null>(null)
  .on(getApplicationFx.doneData, (_, data) => data)
  .on(updateApplicationFx.doneData, (_, data) => data)
  .on(updateIsFavoriteApplicationFx.doneData, (store, data) => {
    if (store) {
      const newDate = { ...store, isFavorite: data.isFavorite };
      return newDate;
    }
    return data;
  });

sample({
  clock: updateApplicationEvent,
  target: updateApplicationFx,
});

sample({
  clock: updateApplicationFx.doneData,
  target: notificationModel.showAlert.prepend(() => ({
    title: 'Успешно',
    message: 'Изменения сохранены'
  }))
});

export {
  $application,
  $applications,
  getApplicationsFx,
  getApplicationFx,
  updateApplicationEvent,
  updateIsFavoriteApplicationFx,
  deleteApplicationFx,
  applicationsLoading,
  resetApplicationsListEvent
};
