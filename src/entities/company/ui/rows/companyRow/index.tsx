import React from 'react';
import { Table } from '@box/shared/ui';
import { Avatar } from '@box/entities/user';
import Verified from '@assets/icons/16_verified.svg';
import Reliable from '@assets/icons/16_reliable.svg';
import Check from '@assets/icons/16_checkmark.svg';
import { useRouter } from 'next/router';
import StarImg from '@box/shared/ui/starImg';
import { ICompanyRow } from './types';
import { Rating } from '@box/shared/ui';


export const CompanyRow: React.FC<ICompanyRow> = ({ company, onClickInFavorite }) => {
  const router = useRouter();

  return (
    <Table.Row
      className="cursor-pointer"
      onClick={() => {
        router.push(`/companies/${company.id}`);
      }}
    >
      <Table.Cell className="pr-8 w-[350px]">
        <div className="flex items-center  gap-6">
          <Avatar className="shrink-0" size="sm" url={company?.image || null} />
          <div>
            {company.name}
            <Rating rating={company.averageReviewRate} total={company.dealsCount || 0} />
            {company.status?.id === 2 && <Verified className="inline" />}
            {company.status?.id === 3 && (
              <>
                <Verified className="inline" />
                <Reliable className="inline" />
              </>
            )}
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className="pr-8">
        {
          // eslint-disable-next-line react/no-array-index-key
          company.applicationTypes?.map((el, id) => <p key={id}>{el}</p>)
        }
        {
          company.applicationTypes?.length === 0 && <p>Нет</p>
        }
      </Table.Cell>
      <Table.Cell>
       
        {
        // eslint-disable-next-line react/no-array-index-key
          company.activities?.map((el, id) => <p key={id}>{el}</p>)
        }
        {
          company.activities?.length === 0 && <p>Нет</p>
        }
      </Table.Cell>
      <Table.Cell className="pr-6">
        {company.withNds ? <Check /> : 'Нет'}
      </Table.Cell>
      <Table.Cell>
        <p>{company.recyclablesType || 'Нет'}</p>
        {company.recyclablesType && (
          <p className="text-sm font-light text-primaryGreen-main underline">
            И еще
            {' '}
            {company.recyclablesCount - 1}
          </p>
        )}
      </Table.Cell>
      <Table.Cell className="">
        <p>{company.city ? company.city.name : ''}</p>
        <p className="text-sm font-light text-primaryGreen-main underline">
          Адрес
        </p>
      </Table.Cell>
      <Table.Cell>
        <StarImg onClick={(e) => onClickInFavorite(company.id, e)} fill={company.isFavorite ? '#399977' : 'none'} />
      </Table.Cell>
    </Table.Row>
  );
};
