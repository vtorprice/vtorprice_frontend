import React from 'react';
import { Separator } from '@box/shared/ui';
import { Avatar } from '@box/entities/user';
import classNames from 'classnames';
import Link from 'next/link';
import { IContractorCard } from './types';

export const ContractorCard: React.FC<IContractorCard> = ({
  contractor,
  className
}) => (
  <Link href={`/contractors/${contractor.id}`} className={classNames('p-[16px] bg-grey-10 rounded-[10px]', className)}>
    <div className="flex gap-[10px]">
      <Avatar className="shrink-0" size="sm" url={contractor?.avatarOrCompanyLogo || null} />
      <div>
        <p>
          {contractor.name}
        </p>
      </div>
    </div>
    <Separator h={10} />
    <div className="flex gap-[25px] flex-wrap">
      <div className="">
        <p className="text-xs text-grey-40">Тип компании</p>
        <p className="text-sm mt-[2px]">{contractor.contractorType.label}</p>
      </div>
      <div>
        <p className="text-xs text-grey-40">Адрес</p>
        <p className="text-sm mt-[2px]">{contractor.address}</p>
      </div>
    </div>
    <Separator h={10} />
    <div>
      <p className="text-xs text-grey-40">Собственные ТС</p>
      <p className="text-sm mt-[2px]">{contractor.transportOwnsCount}</p>
    </div>
  </Link>

);
