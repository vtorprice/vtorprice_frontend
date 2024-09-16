import { Avatar } from '@box/entities/user';
import { useField, useForm } from '@box/shared/effector-form-controller/hooks';
import { AsyncSelect, BaseInput, Checkbox, FileButton } from '@box/shared/ui';
import { IWithClass } from '@box/types';
import { useStore } from 'effector-react';
import React, { useMemo, useRef } from 'react';
import AvatarEditIcon from '@assets/icons/avatar_edit.svg';
import classNames from 'classnames';
import s from './style.module.scss';

import {
  nameField,
  innField,
  addressField,
  descriptionField,
  loading,
  companyInfoForm,
  avatarField,
  withNdsField,
  longitudeField,
  latitudeField,
  bicField, 
  paymentAccountField, 
  correctionAccountField,
  bankNameField,
  headFullNameField,
  phoneField,
  cityField
} from '../model';
import { TGeoSelectValues } from "@box/shared/ui/select/geo-select/types";
import dynamic from "next/dynamic";
import { CompanyUserInfoForm } from '../../user_info';
import { citySelectApi } from '@box/entities/city';

const DynamicGeoSelect = dynamic(
  () => import('@box/shared/ui').then(module => module.GeoSelect),
  { ssr: false }
)

export const CompanyInfoForm: React.FC<IWithClass> = ({
  className,
}) => {
  const formRef = useRef(null);
  const name = useField(nameField);
  const inn = useField(innField);
  const address = useField(addressField);
  const description = useField(descriptionField);
  const avatar = useField(avatarField);
  const withNds = useField(withNdsField);
  const longitude = useField(longitudeField);
  const latitude = useField(latitudeField);

  const bic                = useField(bicField);
  const payment_account    = useField(paymentAccountField);
  const correction_account = useField(correctionAccountField);
  const bank_name          = useField(bankNameField);
  const head_full_name     = useField(headFullNameField);
  const phone              = useField(phoneField);
  const city               = useField(cityField);

  const avatarUrl = useMemo(() => {
    const avatarValue = avatar.store.$value;
    if (avatarValue !== null) {
      if (typeof avatarValue === 'string') {
        return process.env.NEXT_PUBLIC_API_URL + avatarValue;
      }

      return URL.createObjectURL(avatarValue);
    }
    return null;
  }, [avatar.store.$value]);

  useForm(companyInfoForm, formRef);

  const loadingStore = useStore(loading.$loaderStore);

  const handleSelectAddress = (data: TGeoSelectValues) => {
    address.onChange(data.address);
    latitude.onChange(data.latitude);
    longitude.onChange(data.longitude);
  };

  return (
    <form ref={formRef} className={className}>
      <p className="text-sm mb-[26px] text-grey-60">Ваш аватар:</p>
      <div className="flex justify-center">
        <div className="flex justify-center">
          <FileButton onChange={(file) => avatar.onChange(file)}>
            <div className="relative">
              <Avatar loading={loadingStore} url={avatarUrl} size="lg" />
              <AvatarEditIcon className="absolute right-0 bottom-0" />
            </div>
          </FileButton>
        </div>
      </div>
      <div className="mt-[26px]">
        <p className="text-sm mb-[26px] text-grey-60">Ваши данные:</p>
        <div className="flex flex-col gap-[16px]">
          <div className={classNames('flex gap-[16px]', s.block)}>
            <BaseInput loading={loadingStore} onChange={inn.onChange} value={inn.store.$value} error={!!inn.store.$error} className="grow" placeholder="ИНН" required />
            <BaseInput loading={loadingStore} onChange={name.onChange} value={name.store.$value} error={!!name.store.$error} className="grow" placeholder="Название компании" required />

          </div>
          {/* Это потому что порой дизайнеру и менеджеру по совместительсту хотеться резко поменять структуру формы */}
          <CompanyUserInfoForm />
          <div className={classNames('flex gap-[16px]', s.block)}>
            <BaseInput loading={loadingStore} onChange={phone.onChange} value={phone.store.$value} error={!!phone.store.$error} className="grow" placeholder="Контактный телефон" required />
            <AsyncSelect
              className={classNames('', s.sitySelect)}
              placeholder="Город"
              value={city.store.$value}
              loadData={citySelectApi}
              onSelect={city.onChange}
              error={!!city.store.$error}
              required
            />
          </div>
          <div className={classNames('flex gap-[16px] items-center', s.nds)}>
            <DynamicGeoSelect
              inputValue={address.store.$value}
              className="grow"
              placeholder="Адрес"
              error={!!address.store.$error || !!latitude.store.$error || !!longitude.store.$error}
              onInput={address.onChange}
              onSelect={handleSelectAddress}
              required
            />
            <div className="bg-white h-[56px] self-stretch px-[15px] flex items-center rounded-[10px] shadow">
              <Checkbox checked={withNds.store.$value} onChange={withNds.onChange} description="С НДС" />
            </div>
          </div>
          <BaseInput loading={loadingStore} onChange={description.onChange} value={description.store.$value} error={!!description.store.$error} className="grow" placeholder="Краткая информация о компании" />
        </div>
      </div>
      <p className="text-sm mb-[26px] mt-[16px] text-grey-60">Реквизиты:</p>
      <div className="flex flex-col gap-[16px]">
        <div className={classNames('flex gap-[16px]', s.blockV2)}>
          <BaseInput loading={loadingStore} onChange={head_full_name.onChange} value={head_full_name.store.$value} error={!!head_full_name.store.$error} className="grow" placeholder="ФИО директора (лицо с правом подписи)" />
          <BaseInput loading={loadingStore} onChange={bank_name.onChange} value={bank_name.store.$value} error={!!bank_name.store.$error} className="grow" placeholder="Наименование банка" />
        </div>
        <div className={classNames('flex gap-[16px]', s.blockV2)}>
          <BaseInput loading={loadingStore} onChange={payment_account.onChange} value={payment_account.store.$value} error={!!payment_account.store.$error} className="grow" placeholder="Рассчётный счёт" />
          <BaseInput loading={loadingStore} onChange={correction_account.onChange} value={correction_account.store.$value} error={!!correction_account.store.$error} className="grow" placeholder="Корреспондентский счёт" />
          <BaseInput loading={loadingStore} onChange={bic.onChange} value={bic.store.$value} error={!!bic.store.$error} className="grow" placeholder="БИК" />
        </div>
      </div>
    </form>

  );
};
