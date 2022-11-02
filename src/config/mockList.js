import { h } from 'vue';
import EditSurvey from '@/components/dataDisplay/list/fragment/EditSurvey.vue';
import SurveyStatus from '@/components/dataDisplay/list/fragment/SurveyStatus.vue';

export const customerManagementConfig1 = externalFn => ([
  {
    label: '姓名',
    width: '100',
    align: 'left',
    key: 'customerName',
  },
  {
    label: '手機號碼',
    width: '120',
    align: 'left',
    key: 'phone',
  },
  {
    label: 'Email',
    // width: '350',
    align: 'left',
    key: 'email',
  },
  {
    label: '金額',
    width: '100',
    align: 'right',
    key: 'price',
    headerAlign: 'left',
  },

  {
    width: '100',
    label: '狀態',
    align: 'left',
    key: 'surveyStatus',
    render: h(SurveyStatus, {
      externalFn,
    }),
  },
  {
    // width: '200',
    label: '建立/更新時間',
    align: 'left',
    key: 'updateTime',
  },
  {
    width: '50',
    label: '編輯',
    align: 'center',
    key: 'editSurvey',
    render: h(EditSurvey),
  },
]);

export const customerManagementConfig2 = [
  {
    label: '姓名',
    width: '200',
    align: 'left',
    key: 'customerName',
  },
  {
    label: '手機號碼',
    width: '420',
    align: 'left',
    key: 'phone',
  },
  {
    label: 'Email',
    width: '500',
    align: 'left',
    key: 'email',
  },
  {
    label: '金額',
    width: '200',
    align: 'right',
    key: 'price',
    headerAlign: 'left',
  },
  {
    width: '100',
    label: '編輯',
    align: 'left',
    key: 'editSurvey',
    render: h(EditSurvey),
  },
  {
    width: '100',
    label: '狀態',
    align: 'left',
    key: 'surveyStatus',
    render: h(SurveyStatus),
  },
  {
    width: '500',
    label: '建立/更新時間',
    align: 'left',
    key: 'updateTime',
  },
];
