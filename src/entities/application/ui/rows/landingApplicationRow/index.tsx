import React from 'react';
import { Rating, Table } from '@box/shared/ui';
import { Avatar } from '@box/entities/user';
import { useRouter } from 'next/router';
import { ILandingApplicationRow } from './types';
import Verified from '@assets/icons/16_verified.svg';
import Reliable from '@assets/icons/16_reliable.svg';

export const LandingApplicationRow: React.FC<ILandingApplicationRow> = ({
  application
}) => {
  const router = useRouter();
  return (
    <Table.Row
      className="cursor-pointer"
      onClick={() => {
        router.push(`/applications/${application.id}`);
      }}
    >
      <Table.Cell className="max-w-[200px]">
        {application.recyclables.name}
      </Table.Cell>
      <Table.Cell className="max-w-[400px]">
        <div className="flex items-center  gap-6">
          <Avatar className="shrink-0" size="sm" url={application.company?.image || null} />
          <div>
            <p>{application.company.name}</p>
            <Rating rating={application.company.averageReviewRate} total={application.company.dealsCount || 0} />
            {application.company.status?.id === 2 && <Verified className="inline" />}
            {application.company.status?.id === 3 && (
              <>
                <Verified className="inline" />
                <Reliable className="inline" />
              </>
            )}
          </div>
        </div>

        </Table.Cell>
      <Table.Cell className="pr-[20px]">
        {(application.totalWeight / 1000).toFixed(1)}
        {' '}
        {/*кг*/}
      </Table.Cell>
      <Table.Cell>
        {application.price * 1000}
        {' '}
        {/*₽/кг*/}
      </Table.Cell>
      <Table.Cell>
        {application.totalPrice.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 })}
      </Table.Cell>
    </Table.Row>
  );
};
