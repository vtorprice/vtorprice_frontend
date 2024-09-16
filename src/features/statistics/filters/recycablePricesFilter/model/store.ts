import { TimeframeTypes } from '@box/entities/application';
import { createForm } from '@box/shared/effector-forms';
import { ISelectValue, ITabSelectValue } from '@box/shared/ui';

const filters = createForm({
  fields: {
    category__parent: {
      init: null as ISelectValue | null
    },
    applications__city: {
      init: null as ISelectValue | null
  },
    applications__urgency_type: {
        init: null as ISelectValue | null
    },
    period: {
      init: TimeframeTypes[0] as ITabSelectValue | null
    },
  }
});

export {
  filters
};