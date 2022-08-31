<template>
  <div class="v-image">
    <dev-section title="基本使用">
      <div class="wrap">
        <dev-desc api="">預設撐滿容器寬度，高度由瀏覽器自動縮放</dev-desc>
        <dev-desc api="">alt, arial-label 預設「圖片」</dev-desc>
        <div class="wrap__image">
          <ReImage
            src="https://shoplineimg.com/5da7fd959db3cb004ea189c2/614065e6116e32003e3dc68e/800x.jpg?"
            alt="鬱金香"
          />
        </div>
      </div>

      <div class="wrap">
        <dev-desc api="">預設撐滿容器寬度，高度由瀏覽器自動縮放</dev-desc>
        <dev-desc api="">alt, arial-label 預設「圖片」</dev-desc>
        <dev-desc api="">若不寫 arial-label，arial-label 會自動帶入 alt 內容</dev-desc>
        <div class="wrap__image">
          <ReImage
            src="https://shoplineimg.com/5da7fd959db3cb004ea189c2/614065e6116e32003e3dc68e/800x.jpg?"
            alt="鬱金香"
            aria-label="鬱金香圖片"
          />
        </div>
      </div>
    </dev-section>
    <dev-section title="預設圖片 placeholder">
      <div class="wrap">
        <div class="wrap__image">
          <ReImage />
        </div>
      </div>
    </dev-section>
    <dev-section title="自訂圖片 placeholder">
      <div class="wrap">
        <dev-desc api="props" type="String, Object">srcPlaceholder: 自定義圖片的路徑或檔案</dev-desc>
        <div class="wrap__image">
          <ReImage :srcPlaceholder="cusImagePlaceholder" />
        </div>
      </div>
    </dev-section>

    <dev-section title="自定義寬度、高度">
      <div class="wrap">
        <dev-desc api="" type="">預設</dev-desc>
        <ReImage :src="tulip2" />
      </div>
      <div class="wrap">
        <dev-desc api="props" type="String">width: 自定義圖片寬度, e.g. 100px 寬 </dev-desc>
        <div class="wrap__image">
          <ReImage :src="tulip2" width="100px" />
        </div>
      </div>
      <div class="wrap">
        <dev-desc api="props" type="String">height: 自定義圖片高度, e.g. 100px 高 </dev-desc>
        <div class="wrap__image">
          <ReImage :src="tulip2" height="100px" width="auto" />
        </div>
      </div>
      <div class="wrap">
        <dev-desc api="props" type="String"
          >width, height: 自定義圖片寬度高度, e.g. 100px寬, 100px高(有這種情境嗎?)
        </dev-desc>
        <div class="wrap__image">
          <ReImage :src="tulip2" width="100px" height="100px" />
        </div>
      </div>
    </dev-section>
    <dev-section title="object-fit: contain">
      <div class="wrap">
        <dev-desc api="props" type="Boolean">contain: 根據設定的寬高，等比例撐到最滿 </dev-desc>
        <dev-desc api="props" type="String">contain-bg: contain 設定下的背景色 </dev-desc>
        <dev-desc api="props" type="String"
          >contain-border: contain 設定下的邊框，邊框以 outline 處理(因為不佔位)
        </dev-desc>
        <div class="wrap__inline">
          <div class="wrap__content__box image-box">
            <ReImage :src="tulip" width="250px" height="250px" contain />
          </div>
          <div class="wrap__content__box image-box">
            <ReImage :src="tulip2" width="250px" height="250px" contain />
          </div>
          <div class="wrap__content__box image-box">
            <ReImage :src="tulip3" width="250px" height="250px" contain />
          </div>
          <div class="wrap__content__box image-box">
            <ReImage :src="tulip2" width="250px" height="250px" contain contain-bg="#ccc" />
          </div>
          <div class="wrap__content__box image-box">
            <ReImage :src="tulip3" width="250px" height="250px" contain contain-bg="#ccc" />
          </div>
          <div class="wrap__content__box image-box">
            <ReImage
              :src="tulip2"
              width="250px"
              height="250px"
              contain
              contain-bg="#ccc"
              contain-border="1px solid #999"
            />
          </div>
          <div class="wrap__content__box image-box">
            <ReImage
              :src="tulip3"
              width="250px"
              height="250px"
              contain
              contain-bg="#ccc"
              contain-border="2px dashed #777"
            />
          </div>
        </div>
      </div>
    </dev-section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import ReImage from '@/components/ReImage.vue';
import cusImagePlaceholder from '@/assets/image/cus-image-placeholder.jpeg';
import tulip from '@/assets/image/tulip.jpeg';
import tulip2 from '@/assets/image/tulip2.jpeg';
import tulip3 from '@/assets/image/tulip3.jpeg';

export default defineComponent({
  name: 'ViewImage',
  components: {
    ReImage,
  },
  setup() {
    return {
      cusImagePlaceholder,
      tulip,
      tulip2,
      tulip3,
    };
  },
});
</script>

<style lang="scss" scoped>
.v-image {
  // width: 250px;
}

.wrap {
  &__image {
    max-width: 250px;
  }
}

// .image-box {
//   outline: 1px solid #777;
// }
</style>
