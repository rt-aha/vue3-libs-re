import { h } from 'vue';
import Link from '@/components/dataDisplay/table/fragment/Link.vue';

export const surveyListConfig = {
  columns: [
    {
      width: '150',
      label: '建案區域',
      align: 'left',
      key: 'area',
    },
    {
      width: '150',
      label: '建案名稱',
      align: 'left',
      key: 'name',
    },
    {
      label: '案型',
      width: '100',
      align: 'left',
      key: 'type',
    },
    {
      label: '建案日期',
      width: '200',
      align: 'left',
      key: 'date',
    },
    {
      label: '建案專屬問卷連結',
      width: '500',
      align: 'left',
      key: 'link',
      render: h(Link),
    },
  ],
};
