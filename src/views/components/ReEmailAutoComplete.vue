<template>
  <div class="v-re-email-auto-complete">ReEmailAutoComplete 施工中 ...</div>
</template>

<script>
import { defineComponent } from 'vue';
import { serialize } from 'object-to-formdata';

export default defineComponent({
  name: 'ViewReEmailAutoComplete',
  setup() {
    const formData = serialize({
      a: '1',
      b: 1,
      c: true,
      d: {
        aa: 'aa',
        bb: 'bb',
        cc: [1, 2, 3, 'a', 'b', 'c'],
      },
      e: [
        {
          hi: 'hi',
          bye: 123,
          status: false,
        },
      ],
    });

    console.log(formData.values());

    return {};
  },
});
</script>

<style lang="scss" scoped></style>
