import React from 'react';
import classNames from 'classnames';
import {
  AsyncSelect, Button, Collapse, PillSelect, Select 
} from '@box/shared/ui';
import { companyModel, recyclablesCategoriesSelectApi } from '@box/entities/company';
import { citySelectApi } from '@box/entities/city';
import { dealTypeSelectValues, urgencyTypeSelectValues } from '@box/entities/application';
import { useForm } from '@box/shared/effector-forms';
import { filters } from '../model';
import s from './style.module.scss';
import { useScreenSize } from '@box/shared/hooks';

export const LandingApplicationsListFilters = () => {
  const { fields } = useForm(filters);
  const [, satisfies] = useScreenSize();
  return (
    <div>
      <div className={classNames('flex items-center', s.filter)}>
        <Select
          inputProps={{
            mode: 'stroke',
          }}
          withClearButton
          value={fields.deal_type.value}
          className={s.field}
          onSelect={fields.deal_type.onChange}
          placeholder="Тип"
          data={dealTypeSelectValues}
        />
        <AsyncSelect
          inputProps={{
            mode: 'stroke',
          }}
          containerSize={1220}
          withClearButton
          value={fields.recyclables__category.value}
          wide
          onSelect={fields.recyclables__category.onChange}
          className={classNames('grow-[2]', s.field)}
          placeholder="Категория"
          loadData={recyclablesCategoriesSelectApi}
        />
        <Select
          inputProps={{
            mode: 'stroke',
          }}
          withClearButton
          value={fields.total_weight.value}
          className={`${s.field} ${s.last_field}`}
          placeholder="Какой объем, т"
          onSelect={fields.total_weight.onChange}
          data={[
            {
              id: 7,
              label: 'До 5 тонн',
              value: [undefined, 5],
            },
            {
              id: 8,
              label: '5-20 тонн',
              value: [5, 20],
            },
            {
              id: 9,
              label: 'Свыше 20 тонн',
              value: [20, undefined],
            },
          ]}
        />
        <AsyncSelect
          inputProps={{
            mode: 'stroke',
          }}
          withClearButton
          onSelect={fields.city.onChange}
          value={fields.city.value}
          className={classNames('grow-[1]', s.field, s.last_field)}
          placeholder="Город"
          loadData={citySelectApi}
        />
        <Select
          inputProps={{
            mode: 'stroke',
          }}
          withClearButton
          value={fields.urgency_type.value}
          onSelect={fields.urgency_type.onChange}
          className={classNames('grow-[1]', s.field, s.last_field)}
          placeholder="Готовность"
          data={urgencyTypeSelectValues}
        />
      <Collapse
        opened={fields.recyclables__category.value !== null
            && fields.recyclables__category.value?.value.recyclables.length > 0}
            className={classNames("hidden", s.show)}
      >
        <PillSelect<companyModel.ICompanyRecyclable['recyclables']>
          onChange={fields.recyclables.onChange}
          values={fields.recyclables__category.value?.value.recyclables?.map((val) => ({
            id: val.id,
            label: val.name,
            value: val
          })) || []}
          value={fields.recyclables.value}
          className="pt-[30px] pl-[15px]"
        />
      </Collapse>
        <Button
          mode="notFilled"
          onClick={() => {
            if (!fields.show_table.value) {
              fields.show_table.onChange(true);
            }
          }}
          className={s.button}
        >
          Найти
        </Button>
      </div>
      <Collapse
        opened={fields.recyclables__category.value !== null
            && fields.recyclables__category.value?.value.recyclables.length > 0}
            className={s.hide}
      >
        <PillSelect<companyModel.ICompanyRecyclable['recyclables']>
          onChange={fields.recyclables.onChange}
          values={fields.recyclables__category.value?.value.recyclables?.map((val) => ({
            id: val.id,
            label: val.name,
            value: val
          })) || []}
          value={fields.recyclables.value}
          className="pt-[20px]"
        />
      </Collapse>
    </div>
  );
};
