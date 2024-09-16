import React from 'react';
import classNames from 'classnames';
import {
  AsyncSelect, BaseInput,
  Button, Select, TabSelect
} from '@box/shared/ui';
import { useForm } from '@box/shared/effector-forms';
import { useEvent, useStore, useUnit } from 'effector-react';
import { citySelectApi } from '@box/entities/city';
import Reset from '@assets/icons/20_reset.svg';
import { applicationTypes, dealTypeSelectValues, urgencyTypeSelectValues } from '@box/entities/application';
import { recyclablesSelectApi } from '@box/entities/company';
import { equipmentSelectApi } from '@box/entities/application/api/selects/equipmentSelect';
import { clearApplicationInList, getCityInfoFx } from '@box/pages/map';
import { IWithClass } from '@box/types';
import {
  applyMapApplicationFilters, filters, applicationType, 
  changeApplicationType, resetMapApplicationFilters
} from '../model';

export const MapApplicationFilters: React.FC<IWithClass> = ({ className }) => {
  const { fields, reset } = useForm(filters);
  const type = useStore(applicationType);
  const changeType = useUnit(changeApplicationType);
  const resetType = useUnit(resetMapApplicationFilters);
  const applyFilters = useEvent(applyMapApplicationFilters);
  const clearSeachApplication = useUnit(clearApplicationInList);
  const getCityInfo = useUnit(getCityInfoFx);

  return (
    <div className={classNames('flex flex-col gap-[14px] bg-white-80 rounded-xl py-6 px-4', className)}>
      <h1 className="text-base font-semibold">Фильтр</h1>
      <TabSelect
        className="w-full bg-white-10"
        value={type}
        onChange={(val) => {
          clearSeachApplication();
          changeType(val);
        }}
        values={applicationTypes}
      />
      {type.value === 1 ? (
        <>
          <AsyncSelect 
            placeholder="Тип оборудования"
            value={fields.equipment__category.value}
            onSelect={fields.equipment__category.onChange}
            loadData={equipmentSelectApi}
          />
          <Select
            placeholder="Тип обьявления"
            data={dealTypeSelectValues}
            onSelect={fields.deal_type.onChange}
            value={fields.deal_type.value}
          />
          <BaseInput
            placeholder="Кол-во"
            className="grow"
            value={fields.count.value}
            onChange={fields.count.onChange}
          />
          <AsyncSelect
            placeholder="Город"
            value={fields.city.value}
            loadData={citySelectApi}
            onSelect={fields.city.onChange}
          />
        </>
      ) : (
        <>
          <Select 
            placeholder="Готовность"
            data={urgencyTypeSelectValues}
            value={fields.urgency_type.value}
            onSelect={fields.urgency_type.onChange}
          />
          <Select
            placeholder="Тип обьявления"
            data={dealTypeSelectValues}
            onSelect={fields.deal_type.onChange}
            value={fields.deal_type.value}
          />
          <AsyncSelect
            placeholder="Категория"
            value={fields.recyclables__category.value}
            loadData={recyclablesSelectApi}
            onSelect={fields.recyclables__category.onChange}
          />
          <BaseInput
            placeholder="Обьём"
            className="grow"
            value={fields.weight.value}
            onChange={fields.weight.onChange}
          />
          <AsyncSelect
            placeholder="Город"
            value={fields.city.value}
            loadData={citySelectApi}
            onSelect={fields.city.onChange}
          />
        </>
      )}
      <Button
        onClick={() => {
          applyFilters(type.value);
        }}
        className="grow"
      >
        Применить
      </Button>
      <button
        type="button"
        onClick={() => {
          reset();
          resetType(type.value);
        }}
      >
        <div className="flex gap-3 m-2 justify-center items-center">
          <Reset />
          <p className="text-grey-60">Сбросить</p>
        </div>
      </button>
    </div>
  );
};
