import React from 'react';
import { Pagination, Table } from '@box/shared/ui';
import { IWithClass } from '@types';
import { useGate, useStore } from 'effector-react';
import { applicationModel, LandingApplicationCard, LandingApplicationRow } from '@box/entities/application';
import { usePagination } from '@box/shared/lib/factories';
import classNames from 'classnames';
import { useScreenSize } from '@box/shared/hooks';
import { pagination, gate } from '../model';
import s from './style.module.scss';

export const ApplicationsList: React.FC<IWithClass> = ({
  className
}) => {
  const applications = useStore(applicationModel.$applications);
  const loading = useStore(applicationModel.applicationsLoading.$loaderStore);
  const pag = usePagination(pagination);
  const [, satisfies] = useScreenSize();
  useGate(gate);
  return (
    <>
      {satisfies('md') ? (
        <Table
          pagination={<Pagination pagination={pagination} withoutPositionsPerPage={true} />}
          empty={applications.length === 0}
          className={classNames(className, s.table_view)}
          loading={loading && pag.currentPage === 1}
        >
          <Table.Head className={s.head}>
            <Table.Row>
              <Table.Cell>
                Объявление
              </Table.Cell>
              <Table.Cell>
                Компания
              </Table.Cell>
              <Table.Cell>
                Вес, т
              </Table.Cell>
              <Table.Cell>
                Цена за 1 т, руб
              </Table.Cell>
              <Table.Cell>
                Общая стоимость
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {applications.map((application) => (
              <LandingApplicationRow key={application.id} application={application} />
            ))}
          </Table.Body>
        </Table>
      )
        : (
          <div className={s.card_view}>
            <div className={classNames(s.card_view_block)}>
            {applications
            .map((application) => (
              <LandingApplicationCard
                className={s.card_view_card}
                key={application.id}
                application={application}
              />
            ))}
            </div>
            <Pagination pagination={pagination} />
          </div>
        )}

    </>

  );
};
