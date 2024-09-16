import React, { useEffect } from 'react';
import classNames from 'classnames';
import Logo from '@assets/icons/logo.svg';
import Link from 'next/link';
import { Container } from '@box/shared/ui';
import { useRouter } from 'next/router';
import Burger from '@assets/icons/menu_burger.svg';
import { useBoolean, useScreenSize } from '@box/shared/hooks';
import { useEvent, useStore } from 'effector-react';
import { setShowAuthModal } from '@box/widgets/authModal';
import { AuthView } from '@box/hoc';
import { ProfileShortcut } from '@box/entities/user';
import { headerLinks } from '../lib';
import IconUserForAuth from '@assets/icons/24_user.svg'
import s from './style.module.scss';
import { $authStore } from '@box/entities/auth';

export const Header = () => {
  const router = useRouter();
  const { value: menuOpened, toggle: toggleMenu } = useBoolean(false);
  const setShowAuthForm = useEvent(setShowAuthModal);
  const [, satisfies] = useScreenSize();
  const authStore = useStore($authStore);

  useEffect(() => {
    if (menuOpened) {
      document.body.style.height = 'calc(var(--vh, 1vh) * 100)';
      document.body.style.overflowY = 'hidden';
      return;
    }
    document.body.style.height = 'auto';
    document.body.style.overflowY = 'auto';
  }, [menuOpened]);

  return (
    <div className={classNames('border-b border-b-grey-20 backdrop-blur opacity-95 mb-[30px]', s.header)}>
      <Container className="flex h-full justify-between items-center">
        <div className="flex gap-10 items-center">
          <Link href="/">
            <Logo />

          </Link>
          <div className={classNames('flex gap-5', s.header_links)}>
            {headerLinks.map((link) => (
              <div key={link.id} className="">
                <Link href={link.href}>
                  <p className={classNames('text-sm font-medium', { 'text-grey-40': router.asPath === link.href })}>{link.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className={classNames('flex items-center gap-6')}>
          <AuthView
            unauthorizedComponent={<p onClick={() => setShowAuthForm(true)}
            className="text-base text-primaryGreen-main font-bold hover:text-primaryGreen-light cursor-pointer"> 
            {satisfies("xsm") ? "Авторизация" : <IconUserForAuth/>}</p>}
            authorizedComponent={<ProfileShortcut />}
          />
    
          <div onClick={toggleMenu} className={classNames(s.burger)}>
            <Burger />
          </div>
        </div>
      </Container>
      <div className={classNames(s.menu, { [s.menu_opened]: menuOpened })}>
        <Container className={s.menu_container}>
          {!authStore.isAuth && <p onClick={() => setShowAuthForm(true)}
            className="text-base mb-[40px] text-primaryGreen-main font-bold hover:text-primaryGreen-light cursor-pointer"> 
            {"Авторизация"}</p>}
          {headerLinks.map((link) => (
            <Link key={link.id} className="mt-[24px] block" href={link.href}>
              <p className={classNames('text-lg font-light', { 'text-grey-40': router.asPath === link.href })}>{link.title}</p>
            </Link>
          ))}
        </Container>                
      </div>
    </div>
  );
};
