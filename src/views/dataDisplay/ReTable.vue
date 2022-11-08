<template>
  <div class="v-table">
    <dev-section title="基本使用">
      <div class="wrap">
        <dev-desc text="此組件使用用基本與 ReList 一致" />
        <dev-desc text="使用方式參考 @/config/mockTable" />
        <dev-desc text="label: 欄位名稱" />
        <dev-desc text="width: 欄位寬度，若不寫，會自動分配(欄位是以 flex 處理)" />
        <dev-desc text="align: 對齊方式，預設同時對欄位與欄位名稱生效(欄位是以 text-align 處理)" />
        <dev-desc text="headerAlign: 欄位名稱對齊方式，若填寫會覆蓋欄位名稱 align 的對齊效果，e.g. 金額欄位" />
        <dev-desc text="render: 可自訂組件插入，預設組件內會接收到該欄位的設定、該行資料、index，(參考「編輯」欄位，可點擊 icon 查看 console)" />
        <dev-desc text="若要從使用此組件的頁面將 function 丟進去，參考「狀態」欄位" />
        <ReTableIndex :columns="formatCustomerManagementConfig1" :content-data="mockData" />
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReTableIndex from '@/components/dataDisplay/table/ReTableIndex.vue';
import { customerManagementConfig1 } from '@/config/mockTable';

const mockData = Array.from({ length: 5 }).map((_, index) => ({
  name: `name${index}`,
  salesName: `sales${index}`,
  customerName: `customer${index}`,
  phone: '0987654321',
  email: 'abc@aa.bb',
  status: Math.random() > 0.5 ? 'Yes' : 'No',
  record: '',
  edit: '',
  surveyStatus: Math.floor(Math.random() * 10),
  updateTime: '2022-05-08 14:05',
  price: 173,
}));
const externalFn = (data) => {
  console.log('我是外部 function', data);
};

const formatCustomerManagementConfig1 = computed(() => {
  return customerManagementConfig1(externalFn);
});
</script>
