<template>
  <div class="v-tag">
    <DevSection title="基本使用">
      <div class="wrap">
        <dev-desc text="純顯示" />
        <ReTag v-model="tagValue1" />
      </div>
    </DevSection>
    <DevSection title="tag被點擊時">
      <div class="wrap">
        <dev-events event-name="onClickTag" text="點擊時觸發" />
        <ReTag v-model="tagValue1" @onClickTag="onClickTag" />
      </div>
    </DevSection>
    <DevSection title="可新增/刪除">
      <div class="wrap">
        <dev-events event-name="editable" text="新增/刪除功能" />
        <dev-events event-name="onRemoveItem" text="移除時觸發" />
        <dev-events event-name="onAddTagWarning" text="新增重複時觸發，type 為 repeat" />
        <ReTag
          v-model="tagValue2"
          editable
          @onClickTag="onClickTag"
          @onRemoveItem="onRemoveItem"
          @onAddTagWarning="onAddTagWarning"
        />
      </div>
    </DevSection>

    <DevSection title="設定可新增上限">
      <div class="wrap">
        <dev-props type="String|Number" prop-name="limit" text="標籤上限，預設沒上限" />
        <dev-events event-name="onAddTagWarning" text="新增達上限時，type 為 limit" />
        <dev-desc text="limit=8" />
        <ReTag
          v-model="tagValue3"
          editable
          limit="8"
          @onRemoveItem="onRemoveItem"
          @onAddTagWarning="onAddTagWarning"
        />
      </div>
    </DevSection>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ReTag from '@/components/dataDisplay/ReTag.vue';
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

    const onClickTag = (tag) => {
      console.log('onClickTag ...', tag);
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
      onClickTag,
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
</style>
