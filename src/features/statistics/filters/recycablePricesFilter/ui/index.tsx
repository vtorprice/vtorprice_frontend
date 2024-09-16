import { useForm } from "@box/shared/effector-forms";
import { IWithClass } from "@box/types";
import { filters } from '../model';
import { TimeframeTypes, urgencyTypeSelectValues } from "@box/entities/application";
import { AsyncSelect, Select, TabSelect } from "@box/shared/ui";
import { recyclablesCategoriesSelectApi } from "@box/entities/company";
import { citySelectApi } from "@box/entities/city";
import s from './style.module.scss';
import classNames from "classnames";

  export const RecycablePricesFilters: React.FC<IWithClass> = ({
    className
  }) => {
    const { fields } = useForm(filters);


    return (
        <div className={classNames("flex items-end mt-[16px] justify-between ", s.adaptive, className)}>
          <div className={classNames("flex w-1/2 gap-[10px]", s.tab)}>

              <TabSelect 
              onChange={fields.period.onChange}
              values={TimeframeTypes}
              value={fields.period.value}
              />

          </div>
          <div className={classNames("flex w-1/2 gap-[10px]", s.tab)}>
              <Select
              placeholder="Срочность"
              inputProps={{ mode: 'stroke' }}
              withClearButton
              onSelect={fields.applications__urgency_type.onChange}
              value={fields.applications__urgency_type.value}
              data={urgencyTypeSelectValues}
              />
              <AsyncSelect
              placeholder="Город"
              inputProps={{ mode: 'stroke' }}
              withClearButton
              onSelect={fields.applications__city.onChange}
              value={fields.applications__city.value}
              loadData={citySelectApi}
              />
              <AsyncSelect
              placeholder="Категория"
              inputProps={{ mode: 'stroke' }}
              withClearButton
              onSelect={fields.category__parent.onChange}
              value={fields.category__parent.value}
              loadData={recyclablesCategoriesSelectApi} 
    />
          </div>
        </div>
      
    );
  };
  
