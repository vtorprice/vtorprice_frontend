import React from 'react';
import classNames from 'classnames';
import { Table } from '@box/shared/ui';
import { INotificationRow } from './types';

export const NotificationRow: React.FC<INotificationRow> = ({ notification, onClick }) => (
  <Table.Row onClick={onClick} isHover={false} className={classNames({ 'bg-green-light': notification.isRead }, 'h-[60px] cursor-pointer')}> 
    <Table.Cell>
      <p className={classNames({ 'text-[#2F8063]': notification.isRead })}>{notification.name}</p>
    </Table.Cell>
    <Table.Cell>
      <p className={classNames({ 'text-[#2F8063]': notification.isRead })}>
        {new Intl.DateTimeFormat('ru-RU', {
          month: 'long',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        }).format(new Date(notification.createdAt))}
        {' '}
      </p>
    </Table.Cell>
  </Table.Row>
);
