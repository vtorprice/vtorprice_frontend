import React from 'react';
import Head from 'next/head';
import classNames from 'classnames';
import LowPriority from '@assets/icons/Low Priority.svg';
import Russia from '@assets/icons/Russia.svg';
import Question from '@assets/icons/landing_question_icon.svg';
import Link from 'next/link';
import { AppShell } from '@box/layouts';
import { Header } from '@box/widgets/header';
import { Footer } from '@box/widgets/footer';
import { Button, Collapse, Container } from '@box/shared/ui';
import { LandingSlider } from '@box/widgets/landing';
import { DeliveryCalculator } from '@box/features';
import { LandingApplicationsListFilters, landingApplicationsListFiltersModel } from '@box/features/application';
import dynamic from 'next/dynamic';
import { useField } from '@box/shared/effector-forms';
import { ApplicationsList } from '@box/widgets/applications';
import { useRouter } from 'next/router';
import s from './style.module.scss';
import { PreviewStatistics } from '@box/widgets/landing/previewStatistics/ui';


const LandingStats = dynamic(async () => (await import('@box/widgets/landing/landingStats/ui')).LandingStats, {
  ssr: false,
});
export const Home = () => {
  const showTable = useField(landingApplicationsListFiltersModel.filters.fields.show_table);
  const router = useRouter();
  return (
    <AppShell
      header={<Header />}
      footer={<Footer />}
    >
      <Head>
        <title>Главная</title>
      </Head>
      <Container className={s.container}>
        <div className={classNames('flex items-center justify-between gap-10 mt-[120px] mb-[200px] info_banner')}>
          <div className={s.top_banner}>
            <h1 className="info_banner_title">Вторпрайс - агентство по продаже вторсырья</h1>
            <p className="text-lg text-grey-70 mt-5 font-normal">Поможем купить или продать вторичные ресурсы по оптимальным ценам</p>
            <div className={classNames('flex gap-3 mt-14', s.top_banner_buttons)}>
              <Button onClick={() => {router.push(`/new-application`);}}>Купить</Button>
              <Button onClick={() => {router.push(`/new-application`);}} mode="light">Заявка на продажу</Button>
            </div>
          </div>
          <LandingStats className={classNames(s.banner_stats, 'shrink-0')} />
        </div>
        <LandingApplicationsListFilters />
        <Collapse opened={showTable.value} className="mt-[20px]">
          <ApplicationsList />
        </Collapse>
        <div className={classNames('flex justify-center mt-5', s.jumping_arrow)}>
          <LowPriority />
        </div>
        <div className={classNames('flex items-center justify-between gap-12 mt-[100px] mb-[110px] info_banner')}>
          <div className={classNames('w-5/12 flex justify-center items-center', s.top_banner, s.adaptiveHideXXSM)}>
            <Russia />
          </div>
          <div className={classNames('w-5/12', s.bottom_banner_stats)}>
            <h2 className="text-4xl leading-snug font-medium">Автоперевозки фурами по всей России, Европе и СНГ</h2>
            <div className={classNames('hidden w-5/12 my-[25px] flex justify-center items-center', s.top_banner, s.adaptiveShowXXSM)}>
              <Russia />
            </div>
            <p className="text-lg text-grey-70 mt-5 font-normal">Оставьте заявку – поможем оперативно найти машину под ваши задачи</p>
          </div>
        </div>
        <DeliveryCalculator className="mb-[70px]" />
        <h3 className="text-3xl text-center font-medium mb-[20px]">Статистика для наших пользователей</h3>
        <LandingSlider /> {/* <---------- Это сделал Савва. Если это убрать, то сломаются слайды стат 
        сверху лендинга для мобильного адаптива.*/}
        <p className="text-grey-40 mt-[40px] text-center">Актуальные цены на вторсырье, количество выставленных заявок и совершённых сделок на сайте,</p>
        <p className="text-grey-40 text-center mb-[20px]">количество и типы выставленных компаний на сайте и многое другое</p>
        <p className="text-center text-sm mb-[20px]">Количество выставленных заявок за месяц</p>
        <PreviewStatistics/>
        <div className='w-full flex justify-center mt-[40px]'>
          <Button className="ml-5" onClick={() => router.push('/statistics')}>
            Смотреть статистику
          </Button>
        </div>
      </Container>
      <div className={classNames('mt-[50px] p-[48px] bg-grey-10 flex gap-6 items-center justify-center', s.question)}>
        <div className={classNames('flex items-center gap-5', s.question_left)}>
          <Question />
          <h5 className="text-2xl">Остался вопрос?</h5>
        </div>
        <Link href="https://wa.me/79274155888" target="_blank">
          <p className="text-xl text-primaryGreen-main font-normal underline">Написать в поддержку</p>
        </Link>
      </div>
    </AppShell>
  );
};
