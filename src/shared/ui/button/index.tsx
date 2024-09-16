import React, { forwardRef, useMemo } from 'react';
import classNames from 'classnames';
import Lottie from 'react-lottie';
import loader_white from '@assets/animations/spinner_white.json';
import loader_dark from '@assets/animations/spinner_dark.json';
import s from './style.module.scss';
import { IButton } from './types';

const getLoaderOptions = (mode: 'fill' | 'light' | 'stroke' | 'notFilled', type:'normal' | 'mini') => {
  const size = type === 'normal' ? 24 : 20;
  return {
    config: {
      loop: true,
      autoplay: true,
      animationData: (mode === 'stroke' || mode === 'notFilled') ? loader_dark : loader_white,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    },
    size,
  };
};

export const Button = forwardRef<HTMLButtonElement, IButton>(({
  mode = 'fill',
  type = 'normal',
  iconLeft,
  iconRight,
  className,
  children,
  fullWidth = false,
  loading = false,
  htmlType = 'button',
  width,
  sx,
  rounded,
  childrenClassName,
  ...props
}, ref) => {
  const loaderOptions = useMemo(() => getLoaderOptions(mode, type), [mode, type]);
  const classNameButton = classNames(
    s.button,
    { [s.button_mini]: type === 'mini' },
    s[`button_${mode}`],
    { [s[`button_${mode}_loading`]]: loading },
    {
      'rounded-[10px]': !rounded,
      'rounded-full': rounded
    },
    className
  );
  
  const calcWidth = (() => {
    if (!width && !fullWidth) return;
    if (fullWidth) return '100%';
    if (typeof width === 'string') {
      return width;
    }
    return `${width}px`;
  })();

  return (
    <button
      ref={ref}
      className={classNameButton}
      style={{
        ...(calcWidth && { width: calcWidth }),
        ...sx
      }}
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
      {...props}
    >
      {loading
        ? (
          <Lottie
            options={loaderOptions.config}
            height={loaderOptions.size}
            width={loaderOptions.size}
          />
        )
        : (
          <div className="flex gap-2 items-center">
            {iconLeft}
            <div className="grow flex justify-center">
              <p className={classNames(childrenClassName)}>{children}</p>
            </div>
            {iconRight}
          </div>
        )}

    </button>
  );
});
