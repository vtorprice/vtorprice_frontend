import { $authStore } from '@box/entities/auth';
import { Button } from '@box/shared/ui';
import { useStore } from 'effector-react';
import React from 'react';
import Add from '@assets/icons/16_add.svg';
import Link from 'next/link';
import classNames from 'classnames';
import { Avatar } from '../avatar';
import s from './style.module.scss';
import { ROLE } from '@box/types';

export const ProfileShortcut = () => {
  const { user } = useStore($authStore);
  let nameOfProfile: string | undefined;
  let avatar: string | null;
  switch (user?.role.id as ROLE) {
    case ROLE.ADMIN:
    case ROLE.MANAGER:
    case ROLE.LOGIST:
      nameOfProfile = user?.firstName || user?.lastName ? `${user?.firstName} ${user?.lastName}` : 'Нет ФИО';
      avatar = user?.image ? `${process.env.NEXT_PUBLIC_API_URL}${user?.image as string}` : null;
      break;
    default:
      nameOfProfile = user?.company ? user.company.name : 'Нет компании';
      avatar = user?.company?.image ? `${process.env.NEXT_PUBLIC_API_URL}${user?.company?.image}` : null;
  };
  return (
    <div className="flex items-center gap-[28px]">
      <Link href="/new-application" className={s.new_application_button}>
        <Button iconLeft={<Add />} type="mini" mode="stroke">
          Заявка
        </Button>
      </Link>
      <Link href="/profile/settings">
        <div className="max-w-[180px] cursor-pointer flex gap-[10px] items-center">
          <div className={classNames('grow-1 overflow-hidden', s.new_application_button)}>
            <p className=" text-sm whitespace-nowrap overflow-hidden font-semibold text-ellipsis">{nameOfProfile}</p>

          </div>
          <Avatar className="shrink-0" size="sm" url={avatar} />
        </div>
      </Link>
    </div>
  );
};
