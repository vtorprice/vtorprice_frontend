import { Skeleton } from '@box/shared/ui';
import classNames from 'classnames';
import React from 'react';
import { sizes } from './lib/sizes';
import { IAvatar } from './types';

export const Avatar: React.FC<IAvatar> = ({
  size,
  url,
  className,
  loading = false
}) => {
  if (loading) {
    return (
      <Skeleton
        style={{
          width: sizes[size],
          height: sizes[size]
        }}
        className={classNames('rounded-full overflow-hidden', className)}
      />
    );
  }
  return (
    <div
      style={{
        width: sizes[size],
        height: sizes[size]
      }}
      className={classNames('rounded-full overflow-hidden', className)}
    >
      {typeof url === 'string' ? <img className="w-full h-full object-cover" src={url} alt="" />
        : <img className="w-full h-full object-cover" src="https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg" alt="" />}
    </div>
  );
};
