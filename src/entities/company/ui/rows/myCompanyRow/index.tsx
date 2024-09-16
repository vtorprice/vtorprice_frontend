import React from 'react';
import { Table, TextClamp } from '@box/shared/ui';
import { Avatar } from '@box/entities/user';
import { useRouter } from 'next/router';
import { ICompanyRow } from './types';

export const MyCompanyRow: React.FC<ICompanyRow> = ({ company }) => {
  const router = useRouter();

  return (
    <Table.Row
      onClick={() => {
        router.push(`/profile/my-company/${company.id}`);
      }}
    > 
      <Table.Cell className="w-[500px]">
        <div className="flex items-center gap-6">
          <Avatar className="shrink-0" size="sm" url={company?.image || null} />
          <p>
            {company.name}
          </p>
        </div>
      </Table.Cell>
      <Table.Cell>
        {company.activities.length > 0 ? company.activities.map((item) => <p key={item} className="text-sm mt-[2px]">{item}</p>) : '-'}
      </Table.Cell>
      <Table.Cell>
        <TextClamp>{company.address || '-'}</TextClamp>
      </Table.Cell>
    </Table.Row>
  );
};
