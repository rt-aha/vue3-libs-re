<template>
  <div class="v-countdown">
    <dev-section title="基本使用">
      <ReButton @click="handlStart1">
        <ReCountdown ref="countdownRef1" />
      </ReButton>
    </dev-section>
    <dev-section
      title="自訂 key，重整會抓取上次觸發倒數時間"
    >
      <ReButton @click="handlStart1">
        <ReCountdown ref="countdownRef1" timer-key="uniqueName" />
      </ReButton>
    </dev-section>
    <dev-section title="未倒數時的文字顯示">
      <div class="wrap">
        <dev-props type="String" prop-name="btnName" text="未倒數時的文字顯示，預設為「開始」" />
        <ReButton @click="handlStart2">
          <ReCountdown ref="countdownRef2" btn-name="倒數" />
        </ReButton>
      </div>
    </dev-section>
    <dev-section title="自訂時間長度">
      <div class="wrap">
        <dev-props type="Number | String" prop-name="timeLength" text="設定倒數時間長度，預設為 60 秒" />
        <dev-desc text="e.g. 300" />
        <ReButton @click="handlStart3">
          <ReCountdown ref="countdownRef3" time-length="300" />
        </ReButton>
      </div>
    </dev-section>
    <dev-section title="發送api">
      <div class="wrap">
        <dev-props type="Function" prop-name="api" text="可傳一個欲發送的api，成功會自動開始倒數" />
        <dev-events type="Function" event-name="apiSent" text="api 發送成功 callback" />
        <dev-events type="Function" event-name="apiError" text="發送錯誤 callback" />
        <ReButton @click="handlStart4">
          <ReCountdown ref="countdownRef4" btn-name="發送api" :api="mockApi" @api-error="apiError" @api-sent="apiSent" />
        </ReButton>
      </div>
    </dev-section>
    <dev-section title="倒數開始的事件">
      <div class="wrap">
        <dev-events type="Function" event-name="countStart" text="倒數開始 callback" />
        <ReButton @click="handlStart9">
          <ReCountdown ref="countdownRef9" @countStart="countStart" />
        </ReButton>
      </div>
    </dev-section>
    <dev-section title="倒數結束的事件">
      <div class="wrap">
        <dev-events type="Function" event-name="countEnd" text="倒數結束 callback" />
        <ReButton @click="handlStart10">
          <ReCountdown ref="countdownRef10" @countEnd="countEnd" />
        </ReButton>
      </div>
    </dev-section>
  </div>
</template>

<script setup>
import ReCountdown from '@/components/feedback/ReCountdown.vue';
import ReButton from '@/components/common/ReButton.vue';
import { mockJsonPlaceholder } from '@/api/restfulTest';
console.log('...', customAlphabet('1234567890abcdef', 10)());
const countdownRef1 = ref(null);
const countdownRef2 = ref(null);
const countdownRef3 = ref(null);
const countdownRef4 = ref(null);
const countdownRef9 = ref(null);
const countdownRef10 = ref(null);

const handlStart1 = async () => {
  const key = await countdownRef1.value.triggerTimer();
  console.log('key', key);
};

const handlStart2 = () => {
  countdownRef2.value.triggerTimer();
};

const handlStart3 = () => {
  countdownRef3.value.triggerTimer();
};

const handlStart4 = () => {
  countdownRef4.value.triggerTimer();
};

const handlStart9 = () => {
  countdownRef9.value.triggerTimer();
};

const handlStart10 = () => {
  countdownRef10.value.triggerTimer();
};

const countStart = () => {
  console.log('countStart');
};

const countEnd = () => {
  console.log('countEnd');
};

const mockApi = async () => {
  const res = await mockJsonPlaceholder();
  return res;
};

const apiSent = (timerKey, data) => {
  console.log('apiSent', timerKey, data);
};

const apiError = (timerKey, data) => {
  console.log('apiError', timerKey, data);
};
</script>

<style lang="scss" scoped>
</style>
