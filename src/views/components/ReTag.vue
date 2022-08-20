<template>
  <div class="v-tag">
    <dev-section title="基本使用，純顯示">
      <div class="wrap">
        <re-tag v-model="tagValue1" />
      </div>
    </dev-section>
    <dev-section title="tag被點擊時 ">
      <div class="wrap">
        <dev-desc api="event">onClickItem 事件：點擊時觸發</dev-desc>
        <re-tag v-model="tagValue1" @onClickItem="onClickItem" />
      </div>
    </dev-section>
    <dev-section title="可新增/刪除">
      <div class="wrap">
        <dev-desc type="Boolean">editable: 新增/刪除功能</dev-desc>
        <dev-desc api="event">onRemoveItem: 移除時觸發</dev-desc>
        <dev-desc api="event">onAddTagWarning: 新增錯誤時觸發，e.g. 輸入重複 label 時</dev-desc>
        <re-tag
          v-model="tagValue2"
          editable
          @onClickItem="onClickItem"
          @onRemoveItem="onRemoveItem"
          @onAddTagWarning="onAddTagWarning"
        />
      </div>
    </dev-section>

    <dev-section title="設定可新增上限，假設 8 個">
      <div class="wrap">
        <dev-desc type="Number, String">limit: 新增錯誤時觸發，e.g. 達上限時</dev-desc>
        <dev-desc api="event">onAddTagWarning: 新增錯誤時觸發，e.g. 達上限時</dev-desc>
        <re-tag
          v-model="tagValue3"
          editable
          @onRemoveItem="onRemoveItem"
          @onAddTagWarning="onAddTagWarning"
          limit="8"
        />
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReTag from '@/components/ReTag.vue';
import DevSection from '@/forDev/components/DevSection.vue';
import { mockTagData1, mockTagData2, mockTagData3 } from '@/config/mockData';

export default defineComponent({
  name: 'ViewTag',
  components: {
    ReTag,
    DevSection,
  },
  setup() {
    const tagValue1 = ref(mockTagData1);
    const tagValue2 = ref(mockTagData2);
    const tagValue3 = ref(mockTagData3);

    const onClickItem = (tag) => {
      console.log('onClickItem ...', tag);
    };

    const onRemoveItem = (tag) => {
      console.log('onRemoveItem tag ...', tag);
    };

    const onAddTagWarning = (type) => {
      console.log('onAddTagWarning...', type);
    };

    return {
      tagValue1,
      tagValue2,
      tagValue3,
      onClickItem,
      onRemoveItem,
      onAddTagWarning,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
}

.desc {
  margin-bottom: 10px;
}
</style>
