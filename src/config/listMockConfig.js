import { h } from 'vue';
import EditSurvey from '@/components/dataDisplay/list/fragment/EditSurvey.vue';
import SurveyStatus from '@/components/dataDisplay/list/fragment/SurveyStatus.vue';

export const customerManagementConfig = {
  columns: [
    {
      width: '100',
      label: '建案名稱',
      align: 'left',
      key: 'name',
    },
    {
      width: '100',
      label: '業務人員',
      align: 'left',
      key: 'salesName',
    },
    {
      label: '客戶姓名',
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
      width: '350',
      align: 'left',
      key: 'email',
    },
    {
      width: '150',
      label: '建案簽單狀態',
      align: 'left',
      key: 'status',
    },
    {
      width: '100',
      label: '編輯問卷',
      align: 'left',
      key: 'editSurvey',
      render: h(EditSurvey),
    },
    {
      width: '200',
      label: '問卷狀態',
      align: 'left',
      key: 'surveyStatus',
      render: h(SurveyStatus),
    },
    {
      width: '150',
      label: '建立/更新時間',
      align: 'left',
      key: 'updateTime',
    },
  ],
};
