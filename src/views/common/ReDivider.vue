<template>
  <div class="v-divider">
    <dev-section title="基本使用 & 調整推開距離">
      <div class="wrap">
        <p>一段文字</p>
        <ReDivider />
        <p>下面水平線向上推開 50px</p>
        <ReDivider :margin="{ top: '50px', bottom: '100px' }" />
        <p>上面水平線向下推開 100px</p>
      </div>
    </dev-section>

    <dev-section title="水平：顏色、厚度、長度">
      <div class="wrap">
        <p>顏色</p>
        <ReDivider color="#cd5c5c" />
        <p>厚度</p>
        <ReDivider color="#cd853f" bold="10px" />
        <p>長度</p>
        <ReDivider color="#4caf50" length="100px" />
        <p>虛線</p>
        <ReDivider color="#cd5c5c" length="100px" type="dashed" />
        <p>一起使用</p>
        <ReDivider color="#032f60" length="300px" bold="5px" />
      </div>
    </dev-section>

    <dev-section title="垂直">
      <div class="wrap">
        <p class="text">
          <span>一段文字 </span>
          <ReDivider verticle />
          <span>右邊線向左推開50px</span>
          <ReDivider verticle :margin="{ left: '50px', right: '100px' }" />
          <span>左邊線向左推開100px</span>
        </p>
      </div>
    </dev-section>
    <dev-section title="垂直：調整推開距離">
      <div class="wrap">
        <p class="text">
          <span>文字a</span>
          <ReDivider verticle :margin="{ left: '50px', right: '50px' }" />
          <span>文字b</span>
          <ReDivider verticle :margin="{ left: '50px', right: '50px' }" />
          <span>文字c</span>
        </p>
      </div>
    </dev-section>

    <dev-section title="垂直：顏色">
      <div class="wrap">
        <p class="text">
          <span>顏色</span>
          <ReDivider verticle color="#cd5c5c" />
          <span>厚度</span>
          <ReDivider verticle color="#cd853f" bold="5px" />
          <span>長度</span>
          <ReDivider verticle color="#4caf50" length="30px" />

          <span>樣式</span>
          <ReDivider verticle color="#4caf50" type="dashed" />
          <span>一起使用</span>
          <ReDivider verticle color="#032f60" length="10px" bold="3px" />
        </p>
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReDivider from '@/components/common/ReDivider.vue';

export default defineComponent({
  name: 'ViewDivider',
  components: {
    ReDivider,
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
}

.text {
  @include flex();
}
</style>
