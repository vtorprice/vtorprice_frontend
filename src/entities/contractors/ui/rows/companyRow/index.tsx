import React from 'react';
import { Table } from '@box/shared/ui';
import { Avatar } from '@box/entities/user';
import { ICompanyRow } from './types';

export const ContractorsRow: React.FC<ICompanyRow> = ({ company, documents }) => (
  <Table.Row>
    <Table.Cell className="pr-8">
      <div className="flex items-center  gap-6">
        <Avatar className="shrink-0" size="sm" url={company?.avatarOrCompanyLogo || null} />
        <p>
          {company.name}
        </p>
      </div>
    </Table.Cell>
    <Table.Cell className="pr-6">
      <p>{company.contractorType.label}</p>
    </Table.Cell>
    <Table.Cell>
      <p>{company.address}</p>
    </Table.Cell>
    <Table.Cell>
      <p>{company.transportOwnsCount}</p>
    </Table.Cell>
    <Table.Cell>
      {documents}
    </Table.Cell>
  </Table.Row>
);
