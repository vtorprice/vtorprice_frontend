import { ITabSelectValue } from '@box/shared/ui';

export const dealTypeSelectValues: Array<ITabSelectValue<number>> = [
  {
    id: 1,
    label: 'Покупка',
    value: 1,
  },
  {
    id: 2,
    label: 'Продажа',
    value: 2,
  },
];

export const urgencyTypeSelectValues: Array<ITabSelectValue<number>> = [
  {
    id: 1,
    label: 'Готово к отгрузке',
    value: 1
  },
  {
    id: 2,
    label: 'Контракт на поставку',
    value: 2
  },
];

export const applicationStatusSelectValues: Array<ITabSelectValue<number>> = [
  {
    id: 1,
    label: 'На проверка',
    value: 1,
  },
  {
    id: 2,
    label: 'Опубликована',
    value: 2,
  },
  {
    id: 3,
    label: 'Завершена',
    value: 3,
  },
  {
    id: 4,
    label: 'Отклонена',
    value: 4,
  },
];

export const packingSelectValues: Array<ITabSelectValue<number>> = [
  {
    id: 1,
    label: 'Входит в стоимость',
    value: 1,
  },
  {
    id: 2,
    label: 'Вычитается',
    value: 2,
  },
];

export const packingTaxSelectValues: Array<ITabSelectValue<number>> = [
  {
    id: 1,
    label: 'На упаковку с каждой кипы',
    value: 1,
  },
  {
    id: 2,
    label: 'На упаковку с общего веса',
    value: 2,
  },
];

export const wasInUseSelectValues: Array<ITabSelectValue<number>> = [
  {
    id: 1,
    label: 'Новое',
    value: 0
  },
  {
    id: 2,
    label: 'Б/У',
    value: 1
  },
];
export const applicationTypes: Array<ITabSelectValue<number>> = [
  {
    id: 1,
    label: 'Оборудование',
    value: 1
  },
  {
    id: 2,
    label: 'Вторсырье',
    value: 2
  }
];

export const TimeframeTypes: Array<ITabSelectValue<string>> = [
  {
    id: 1,
    label: 'Неделя',
    value: 'week'
  },
  {
    id: 2,
    label: 'Месяц',
    value: 'month'
  },
  {
    id: 3,
    label: 'Год',
    value: 'year'
  },
  {
    id: 4,
    label: 'Все время',
    value: 'all'
  }
];