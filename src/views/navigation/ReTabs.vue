<template>
  <div class="v-tabs">
    <dev-section title="基本使用">
      <div class="wrap">
        <dev-desc
          text="預設 config 中的 name 與 slot name 對應，可直接將內容放入 <template #{name}>，亦可自行使用 v-model 值與 v-show/v-if 切換"
        />
        <ReTabs v-model="val1" :tabs-config="tabsConfig" @change="handleTab1">
          <template #sport>
            sport
          </template>
          <template #entertainment>
            entertainment
          </template>
          <template #life>
            life
          </template>
        </ReTabs>
      </div>
    </dev-section>
    <dev-section title="基本使用:撐滿寬">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="full-width" text="tabs 平均撐滿" />
        <ReTabs v-model="val2" :tabs-config="tabsConfig" full-width @change="handleTab2">
          <template #sport>
            sport
          </template>
          <template #entertainment>
            entertainment
          </template>
          <template #life>
            life
          </template>
        </ReTabs>
      </div>
    </dev-section>

    <dev-section title="基本使用:沒有底線">
      <div class="wrap">
        <dev-props type="Boolean" prop-name="without-bottom-line" text="不顯示底線" />
        <ReTabs v-model="val3" :tabs-config="tabsConfig" without-bottom-line @change="handleTab3">
          <template #sport>
            sport
          </template>
          <template #entertainment>
            entertainment
          </template>
          <template #life>
            life
          </template>
        </ReTabs>
      </div>
    </dev-section>

    <dev-section title="以 hover 觸發">
      <div class="wrap">
        <dev-props type="'click' | 'hover'" prop-name="trigger" text="hover 就觸發切換" />
        <ReTabs v-model="val4" :tabs-config="tabsConfig" trigger="hover" @change="handleTab4">
          <template #sport>
            sport
          </template>
          <template #entertainment>
            entertainment
          </template>
          <template #life>
            life
          </template>
        </ReTabs>
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReTabs from '@/components/navigation/ReTabs.vue';

const tabsConfig = [
  {
    label: '運動',
    name: 'sport',
  },
  {
    label: '娛樂',
    name: 'entertainment',
  },
  {
    label: '生活',
    name: 'life',
  },
];

const val1 = ref('sport');
const val2 = ref('sport');
const val3 = ref('sport');
const val4 = ref('sport');

const handleTab1 = (tabInfo) => {
  if (tabInfo?.name) {
    val1.value = tabInfo.name;
  }
};

const handleTab2 = (tabInfo) => {
  if (tabInfo?.name) {
    val2.value = tabInfo.name;
  }
};

const handleTab3 = (tabInfo) => {
  if (tabInfo?.name) {
    val3.value = tabInfo.name;
  }
};

const handleTab4 = (tabInfo) => {
  if (tabInfo?.name) {
    val4.value = tabInfo.name;
  }
};
</script>
