import {
  AsyncSelect,
  Collapse,
  PillSelect,
  SearchInput,
  Select,
} from '@box/shared/ui';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDebounce, useEffectAfterMount } from '@box/shared/hooks';
import {
  collectionTypeSelectApi,
  companyStatusSelectValues,
  recyclablesSelectApi,
} from '@box/entities/company/api/selects';
import { citySelectApi } from '@box/entities/city/api/selects';
import { useField, useForm } from '@box/shared/effector-forms';
import { useStore } from 'effector-react';
import { IWithClass } from '@types';
import {
  filters,
  $allAdvantages
} from '../model';
import s from './style.module.scss';
import { useRouter } from 'next/router';

export const CompaniesListFiltersSearch: React.FC<IWithClass> = ({
  className
}) => {
  const search = useField(filters.fields.search);
  const [val, setVal] = useState('');
  const debouncedVal = useDebounce(val, 500);

  useEffect(() => {
    search.onChange('');
  }, []);

  useEffectAfterMount(() => {
    search.onChange(debouncedVal);
  }, [debouncedVal]);
  return (
    <SearchInput
      placeholder="Название компании или ИНН..."
      value={val}
      className={classNames('max-w-[400px] w-full', className)}
      onChange={setVal}
      mode="stroke"
    />
  );
};

export const CompaniesListFilters = () => {
  const { fields } = useForm(filters);
  const allAdvantages = useStore($allAdvantages);
  useEffect(() => {
    // Сброс значений полей при монтировании элемента
    
    fields.activity_types__rec_col_types.onChange(null);
    fields.activity_types__advantages.onChange([]);
    fields.recyclables__recyclables.onChange(null);
    fields.status.onChange({
      id: 11,
      label: 'Не обязательно',
      value: null,
    });
    fields.city.onChange(null);
  }, []);
  return (
    <div>
      <div className={classNames('flex items-center gap-[20px]', s.filter)}>
        <AsyncSelect
          withClearButton
          value={fields.activity_types__rec_col_types.value}
          onSelect={fields.activity_types__rec_col_types.onChange}
          withSearch={false}
          wide
          inputProps={{ mode: 'stroke' }}
          containerSize={1220}
          loadData={collectionTypeSelectApi}
          className={classNames(s.field, 'w-[270px] shrink-0')}
          withSpecialWideAndCloseButton={true}
          placeholder="Тип компании"
        />
        <AsyncSelect
          withClearButton
          loadData={recyclablesSelectApi}
          inputProps={{ mode: 'stroke' }}
          value={fields.recyclables__recyclables.value}
          onSelect={fields.recyclables__recyclables.onChange}
          className={classNames(s.field, 'w-[270px] shrink-0')}
          placeholder="Тип вторсырья"
        />
        <Select
          className={s.field}
          inputProps={{ mode: 'stroke' }}
          value={{
            id: 9,
            label: 'Любой',
            value: null,
          }}
          placeholder="Рейтинг"
          data={[
            {
              id: 7,
              label: '5',
              value: {},
            },
            {
              id: 7,
              label: '4 и выше',
              value: {},
            },
            {
              id: 8,
              label: '3 и выше',
              value: {},
            },
            {
              id: 9,
              label: 'Любой',
              value: null,
            },
          ]}
        />
        <Select
          onSelect={fields.status.onChange}
          value={fields.status.value}
          inputProps={{ mode: 'stroke' }}
          className={classNames(s.field, 'w-[210px] shrink-0')}
          placeholder="Верифицированная компания"
          data={companyStatusSelectValues}
        />
        <AsyncSelect
          withClearButton
          onSelect={fields.city.onChange}
          inputProps={{ mode: 'stroke' }}
          value={fields.city.value}
          loadData={citySelectApi}
          className={classNames(s.field_city, 'w-[210px] shrink-0')}
          placeholder="Расположение"
        />
      </div>
      <Collapse className="mt-[20px]" opened={allAdvantages.length > 0}>
        <PillSelect
          value={fields.activity_types__advantages.value}
          onChange={fields.activity_types__advantages.onChange}
          values={allAdvantages.map((el) => ({
            id: el.id,
            label: el.name,
            value: el
          }))}
        />
      </Collapse>
    </div>
  );
};
