import { createForm } from '@box/shared/effector-forms';
import { ISelectValue } from '@box/shared/ui';
import { createEvent } from 'effector';
import { urgencyTypeSelectValues } from '@box/entities/application';

const filters = createForm({
  fields: {
    urgency_type: {
      init: urgencyTypeSelectValues[0]
    },
    search: {
      init: ''
    },
    recyclables: {
      init: null as ISelectValue | null
    },
    price__gte: {
      init: ''
    },
    price__lte: {
      init: ''
    },
    total_weight__gte: {
      init: ''
    },
    total_weight__lte: {
      init: ''
    },
    city: {
      init: null as ISelectValue | null
    },
  }
});

const applyFilters = createEvent();

export {
  filters,
  applyFilters
};
