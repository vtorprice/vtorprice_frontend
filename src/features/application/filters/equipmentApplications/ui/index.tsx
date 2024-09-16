import React, { useState } from "react";
import classNames from "classnames";
import {
  AsyncSelect,
  BaseInput,
  DatePicker,
  SearchInput,
  Select,
} from "@box/shared/ui";
import { useDebounce, useEffectAfterMount } from "@box/shared/hooks";
import { IWithClass } from "@types";
import { citySelectApi } from "@box/entities/city/api/selects";
import { useField, useForm } from "@box/shared/effector-forms";
import { dealTypeSelectValues } from "@box/entities/application";
import { equipmentSelectApi } from "@box/entities/application/api/selects/equipmentSelect";
import { filters } from "../model";

import s from "./style.module.scss";

export const EquipmentsListFiltersSearch: React.FC<IWithClass> = ({
  className,
}) => {
  const search = useField(filters.fields.search);
  const [val, setVal] = useState("");
  const debouncedVal = useDebounce(val, 500);

  useEffectAfterMount(() => {
    search.onChange(debouncedVal);
  }, [debouncedVal]);
  return (
    <SearchInput
      placeholder="Поиск..."
      value={val}
      className={classNames("max-w-[400px] w-full", className)}
      onChange={setVal}
      mode="stroke"
    />
  );
};

export const EquipmentsListFilters = () => {
  const { fields } = useForm(filters);
  return (
    <div className={s.wrapper}>
      <div className={s.pair}>
        <div className={s.row}>
          <Select
            placeholder="Тип"
            className="flex-grow"
            inputProps={{ mode: "stroke" }}
            value={fields.deal_type.value}
            onSelect={fields.deal_type.onChange}
            data={dealTypeSelectValues}
          />
          <AsyncSelect
            placeholder="Тип оборудования"
            className="min-w-[190px]"
            withClearButton
            loadData={equipmentSelectApi}
            inputProps={{ mode: "stroke" }}
            value={fields.equipment_type.value}
            onSelect={fields.equipment_type.onChange}
          />
        </div>
        <div className={s.row}>
          <BaseInput
            className="flex-grow"
            placeholder="Количество"
            mode="stroke"
            type="number"
            value={fields.count.value}
            onChange={(value) => fields.count.onChange(value)}
          />
          <AsyncSelect
            className="flex-grow"
            placeholder="Где"
            inputProps={{ mode: "stroke" }}
            withClearButton
            onSelect={fields.city.onChange}
            value={fields.city.value}
            loadData={citySelectApi}
          />
        </div>
      </div>
      <div className={s.pair}>
        <div className={s.row}>
          <BaseInput
            className="flex-grow"
            placeholder="Цена от"
            mode="stroke"
            type="number"
            value={fields.price__gte.value}
            onChange={fields.price__gte.onChange}
          />
          <BaseInput
            className="flex-grow"
            placeholder="Цена до"
            mode="stroke"
            type="number"
            value={fields.price__lte.value}
            onChange={fields.price__lte.onChange}
          />
        </div>
        <DatePicker
          className="w-full"
          mode="stroke"
          value={fields.created_at.value}
          onChange={fields.created_at.onChange}
        />
      </div>
    </div>
  );
};
