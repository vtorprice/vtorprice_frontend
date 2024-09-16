import React from 'react';
import { IWithClass } from '@types';
import { useGate, useStore } from 'effector-react';
import { StockGlassApplicationListTemplate } from '../template';
import { purchase } from '../../model';
import s from './style.module.scss';
import { Card } from '../card';
import Empty from "@assets/icons/32_empty.svg";

export const StockGlassPurchaseList: React.FC<IWithClass & { show?: boolean }> = ({
  className,
  show
}) => {
  const applications = useStore(purchase.store);
  useGate(purchase.list.gate);
  return (
    <div className={className}>
      <StockGlassApplicationListTemplate
        title="Покупка"
        applications={applications.result}
        pagination={purchase.list.pagination}
        className={s.block}
      />

      {
        show && <div className={s.mobile_block}>
          {!!applications.result.length ?
            applications.result.map(s => <Card key={s.id} application={s} priceColor="green" />) :
            <div className="flex justify-center my-[80px]">
              <div className="flex flex-col items-center">
                <Empty />
                <p className="mt-[20px] text-grey-50 text-sm">По вашему фильтру ничего не найдено</p>
              </div>
            </div>
          }
        </div>
      }
    </div>
  );
};
