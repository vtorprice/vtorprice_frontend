import { combine, sample, createEffect } from 'effector';
import { AxiosError } from 'axios';
import { validationPipe, isNotEmptyString } from '@box/shared/effector-form-controller/validator';
import { $authStore, authApi } from '@box/entities/auth';
import { createField, createForm } from '@box/shared/effector-form-controller';

const $userStore = $authStore.map((store) => store.user);

const nameField = createField<string>({
  initialValue: '',
  validateFn: (val) => validationPipe(val, isNotEmptyString()),
});

nameField.$value.on($userStore, (store, val) => `${val?.lastName} ${val?.firstName} ${val?.middleName}` || store);

const positionField = createField<string>({
  initialValue: '',
  validateFn: (val) => validationPipe(val, isNotEmptyString()),
});

positionField.$value.on($userStore, (store, val) => val?.position || store);

const phoneField = createField<string>({
  initialValue: '',
  validateFn: (val) => validationPipe(val, isNotEmptyString()),
});

phoneField.$value.on($userStore, (store, val) => val?.phone || store);

const userInfoForm = createForm(nameField, positionField, phoneField);

const updateUserInfoFx = createEffect<{
  name: string,
  position: string,
  phone: string
}, void, AxiosError>({
  handler: async ({ name, position, phone }) => {
    const fio = name.split(' ');
    await authApi.updateUser({
      lastName: fio[0],
      middleName: fio[2],
      firstName: fio[1],
      position,
      phone
    });
  },
});

sample({
  clock: userInfoForm.formValid,
  source: combine({
    name: nameField.$value,
    position: positionField.$value,
    phone: phoneField.$value
  }),
  target: updateUserInfoFx,
});

export {
  userInfoForm,
  nameField,
  positionField,
};
