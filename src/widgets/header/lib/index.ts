import { v4 as uuidv4 } from 'uuid';

export const headerLinks = [
  {
    title: 'Каталог компаний',
    href: '/companies',
    sublinks: [
      {
        title: 'Заготовщики',
        href: '/companies', 
      },
      {
        title: 'Переработчики',
        href: '/companies', 
      },
      {
        title: 'Продавцы',
        href: '/companies', 
      },
    ]
  },
  {
    title: 'Биржа',
    href: '/exchange',
  },
  {
    title: 'Статистика',
    href: '/statistics',
  },
  {
    title: 'Оборудование',
    href: '/equipment-applications',
  },
  {
    title: 'Логистика',
    href: '/logistics',
  },
  {
    title: 'FAQ',
    href: '/faq',
  },
  {
    title: 'О компании',
    href: '/about',
  }
].map((el) => {
  const newEl = {
    id: uuidv4(),
    ...el
  };
  return newEl;
});
