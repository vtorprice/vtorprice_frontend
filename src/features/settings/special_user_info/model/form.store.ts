import { combine, sample, createEffect } from 'effector';
import { AxiosError } from 'axios';
import { validationPipe, isNotEmptyString } from '@box/shared/effector-form-controller/validator';
import { createLoaderStore } from '@box/shared/lib/helpers';
import { $authStore, getMeFx, authApi } from '@box/entities/auth';
import { createField, createForm } from '@box/shared/effector-form-controller';


const $userStore = $authStore.map((store) => store.user);

const avatarField = createField<File | null | string>({
  initialValue: null,
});

avatarField.$value.on($userStore, (store, val) => val?.image || store);

const nameField = createField<string>({
  initialValue: '',
});

nameField.$value.on($userStore, (store, val) => `${val?.lastName} ${val?.firstName} ${val?.middleName}` || store);

const positionField = createField<string>({
  initialValue: '',
  //validateFn: (val) => validationPipe(val, isNotEmptyString()),
});

positionField.$value.on($userStore, (store, val) => val?.position || store);

const phoneField = createField<string>({
  initialValue: '',
  validateFn: (val) => validationPipe(val, isNotEmptyString()),
});

phoneField.$value.on($userStore, (store, val) => val?.phone || store);

const specialUserInfoForm = createForm( nameField, positionField, phoneField);

const updateUserInfoFx = createEffect<{
  name: string,
  position: string,
  phone: string,
  image: File | string | null,
}, void, AxiosError>({
  handler: async ({ name, position, phone, image }) => {
    const fio = name.split(' ');
    await authApi.updateUserWithImages({
      lastName: fio[0],
      middleName: fio[2] || "",
      firstName: fio[1] || "",
      position,
      phone,
      image
    });
  },
});

sample({
  clock: specialUserInfoForm.formValid,
  source: combine({
    name: nameField.$value,
    position: positionField.$value,
    phone: phoneField.$value,
    image: avatarField.$value
  }),
  target: updateUserInfoFx,
});

const loading = createLoaderStore(false, getMeFx);


sample({
  clock: updateUserInfoFx.finally,
  target: getMeFx,
});

export {
  specialUserInfoForm,
  positionField,
  nameField,
  loading,
  avatarField,
  phoneField
};
