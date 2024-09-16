export const headers = [
    {
      key: 1,
      label: 'Дата создания',
      ordering: 'createdAt'
    },
    {
      key: 2,
      label: 'Вторсырье',
    },
    {
      key: 3,
      label: 'Цена',
    },
    {
      key: 4,
      label: 'Вес',
    },
    {
      key: 5,
      label: 'Адрес',
    },
  ];

export const headersEquipment = [
    {
        key: 1,
        label: 'Дата создания',
        ordering: 'created_at__gte'
    },
    {
        key: 2,
        label: 'Тип',
        ordering: 'deal_type'
    },
    {
        key: 3,
        label: 'Оборудование',
        ordering: 'equipment'
    },
    {
        key: 4,
        label: 'Цена',
        ordering: 'price__lte',
    },
    {
        key: 5,
        label: 'Кол-во',
        ordering: 'count__lte',
    },
    {
        key: 6,
        label: 'Адрес',
        ordering: 'city',
    },
    {
        key: 7,
        label: '',
    },
];