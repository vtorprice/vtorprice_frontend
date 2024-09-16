import Org from "@assets/icons/24_organizations.svg";
import App from "@assets/icons/24_appeals.svg";
import Chat from "@assets/icons/24_chat.svg";
import Not from "@assets/icons/24_notifications.svg";
import Wal from "@assets/icons/24_wallet.svg";
import Deals from "@assets/icons/24_deals.svg";
import Fav from "@assets/icons/24_favorites.svg";
import Set from "@assets/icons/24_settingsFilled.svg";
import Acc from "@assets/icons/24_access.svg";
import Dealer from "@assets/icons/24_dealer.svg";
import Analytics from "@assets/icons/24_analytics.svg";
import Logistic from "@assets/icons/24_logistic.svg";
import Cont from "@assets/icons/24_contractors.svg";
import { ROLE } from "@box/types";
import { ReactNode } from "react";

const lastTabs = [
  {
    label: "Уведомления",
    icon: <Not />,
    href: "/profile/notifications",
    notifications: true
  },
  {
    label: "Чат",
    icon: <Chat />,
    href: "/profile/chats",
  },
  {
    label: "Настройки",
    icon: <Set />,
    href: "/profile/settings",
  },
];

export const tabs: Record<
  ROLE,
  Array<{
    label: string;
    icon: ReactNode;
    href: string;
  }>
> = {
  [ROLE.ADMIN]: [
    {
      label: "Модерация заявок",
      icon: <App />,
      href: "/applications-verification",
    },
    {
      label: "Все компании",
      icon: <Org />,
      href: "/profile/my-company",
    },
    {
      label: "Заявки всех компаний",
      icon: <App />,
      href: "/profile/applications-management",
    },
    {
      label: "Верификация компаний",
      icon: <Cont />,
      href: "/companies-verification",
    },
    {
      label: "Активные сделки",
      icon: <Deals />,
      href: "/profile/deals",
    },
    {
      label: "Заявки от пользователей",
      icon: <Dealer />,
      href: "/applications-from-users",
    },
    {
      label: "Права доступа",
      icon: <Acc />,
      href: "/profile/access-rights",
    },
    {
      label: "Финансовые показатели",
      icon: <Analytics />,
      href: "/profile/financial-data",
    },
    {
      label: "Избранное",
      icon: <Fav />,
      href: "/profile/favorites",
    },
    ...lastTabs,
  ],
  [ROLE.LOGIST]: [
    {
      label: "Активные сделки",
      icon: <Deals />,
      href: "/profile/logist-active-deals",
    },
    {
      label: "Заявки на перевозку",
      icon: <Logistic />,
      href: "/profile/transport-applications",
    },
    {
      label: "Аналитика",
      icon: <Analytics />,
      href: '/profile/analytics'
    },
    {
      label: "Контрагенты",
      icon: <Cont />,
      href: "/profile/contractors",
    },
    ...lastTabs,
  ],
  [ROLE.SUPER_ADMIN]: [],
  [ROLE.COMPANY_ADMIN]: [
    {
      label: "Счета на оплату",
      icon: <Wal />,
      href: "/profile/payment-invoices",
    },
    {
      label: "Мои заявки",
      icon: <App />,
      href: "/profile/applications",
    },
    {
      label: "Активные сделки",
      icon: <Deals />,
      href: "/profile/deals",
    },
    {
      label: "Логистика",
      icon: <Logistic />,
      href: "/profile/logistics",
    },
    {
      label: "Избранное",
      icon: <Fav />,
      href: "/profile/favorites",
    },
    ...lastTabs,
  ],
  [ROLE.MANAGER]: [
    {
      label: "Модерация заявок",
      icon: <App />,
      href: "/applications-verification",
    },
    {
      label: "Мои компании",
      icon: <Org />,
      href: "/profile/my-company",
    },
    {
      label: "Заявки моих компаний",
      icon: <App />,
      href: "/profile/applications-management",
    },
    {
      label: "Активные сделки",
      icon: <Deals />,
      href: "/profile/deals",
    },
    {
      label: "Логистика",
      icon: <Logistic />,
      href: "/profile/logistics",
    },
    {
      label: "Заявки от пользователей",
      icon: <Dealer />,
      href: "/applications-from-users",
    },
    {
      label: "Финансовые показатели",
      icon: <Analytics />,
      href: "/profile/financial-data",
    },
    {
      label: "Избранное",
      icon: <Fav />,
      href: "/profile/favorites",
    },
    ...lastTabs,
  ],
};
