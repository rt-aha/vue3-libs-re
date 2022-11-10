<template>
  <div class="v-breadcrumb">
    <dev-section title="基本使用">
      <div>
        <dev-props type="{label: String: key: String}[]" prop-name="options" text="基本設定" />
        <ReBreadcrumb :config="config" @onClick="onClick" />
      </div>
    </dev-section>

    <dev-section title="凸顯當前頁面">
      <div>
        <dev-props type="Boolean" prop-name="clarify" text="凸顯當前頁面" />
        <ReBreadcrumb :config="config" clarify @onClick="onClick" />
      </div>
    </dev-section>

    <dev-section title="自訂義組件">
      <div>
        <dev-props type="{...args, render: h()}[]" prop-name="options" text="render 可為一個 .vue 檔" />
        <ReBreadcrumb :config="config2" @onClick="onClick" />
      </div>
    </dev-section>

    <dev-section title="特殊狀況，可自行加工">
      <div>
        <dev-props type="({label: String: key: String}[]) => {label: String: key: String}[]" prop-name="format-config" text="處理原 config 的 callback" />
        <dev-desc text="這是一般根據路由渲染" />
        <ReBreadcrumb :config="formatConfig3" @onClick="onClick" />
        <dev-desc text="多新增一個" mt />
        <ReBreadcrumb :config="formatConfig3" :format-config="formatConfig31" @onClick="onClick" />
        <dev-desc text="處裡已渲染值" mt />
        <ReBreadcrumb :config="formatConfig3" :format-config="formatConfig32" @onClick="onClick" />
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { routeNameMapping } from '@/router';
import ReBreadcrumb from '@/components/navigation/ReBreadcrumb.vue';
import DevBreadcrumbContent from '@/forDev/components/DevBreadcrumbContent.vue';
const route = useRoute();

const config = [
  {
    label: '首頁',
    key: 'home',
  },
  {
    label: '主頁面1',
    key: 'main',
  },
  {
    label: '次頁面1',
    key: 'sub',
  },
];

const config2 = [
  {
    label: '首頁',
    key: 'home',
  },
  {
    label: '主頁面1',
    key: 'main',
    render: DevBreadcrumbContent,
  },
  {
    label: '次頁面1',
    key: 'sub',

  },
];

const config3 = [
  {
    label: '首頁',
    key: 'home',
  },
  {
    label: '主頁面1',
    key: 'main',
  },
  {
    label: '次頁面1',
    key: 'sub',

  },
];

const formatConfig3 = computed(() => {
  const splitName = route.fullPath.split('/').filter(r => r);

  const breadcrumbList = splitName.reduce((list, name) => {
    const genItem = {
      label: routeNameMapping[name],
      key: name,
    };

    list.push(genItem);

    return list;
  }, []);

  return breadcrumbList;
});

const formatConfig31 = (breadcrumb) => {
  breadcrumb.push({
    label: '自行多新增一個',
    key: 'cus1',
  });

  return breadcrumb;
};

const formatConfig32 = (breadcrumb) => {
  const newBreadcrumbList = breadcrumb.map((item) => {
    if (item.key === 'navigation') {
      item.label = '首頁';
      item.key = 'home';
    }

    return item;
  });

  return newBreadcrumbList;
};

const onClick = (item) => {
  console.log('item', item);
};
</script>
