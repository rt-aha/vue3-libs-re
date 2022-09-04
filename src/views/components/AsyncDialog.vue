<template>
  <div class="v-async-dialog">
    <ContentLayout>
      <template v-slot:first>
        <re-button @click="toggleDialog1">trigger, normal</re-button>
        <re-button @click="toggleDialog2">trigger, insert comp</re-button>
      </template>
      <template v-slot:second>
        <pre v-highlightjs>
          <code class="javascript">
  import { defineComponent } from 'vue';
  import useAsyncDialog from '@/hooks/useAsyncDialog';
  import DialogContent from '@/forDev/testComponents/DialogContent.vue';
  import ReButton from '@/components/ReButton.vue';

  export default defineComponent({
    name: 'ViewAsyncDialog',
    components: {
      ReButton,
    },
    setup() {
      const { asyncDialog } = useAsyncDialog();
      const toggleDialog1 = () => {
        asyncDialog({
          content: '刪除成功',
          btns: [
            {
              label: '確認',
              cb: () => {
                console.log('success')
              },

            },
            {
              label: '取消',
              cb: () => {
                console.log('cancel')
              }
            },
            {
              label: '測試',
              cb: () => {
                console.log('test')
              }
            }
          ]
        });
      }

      const toggleDialog2 = () => {
        asyncDialog({
          render: TestComp,
          renderType: 'render',
          btns: [
            {
              label: '確認',
              cb: () => {
                console.log('success')
              },

            },
            {
              label: '取消',
              cb: () => {
                console.log('cancel')
              }
            },
            {
              label: '測試',
              cb: () => {
                console.log('test')
              }
            }
          ]
        });
      }


      return {
        toggleDialog1,
        toggleDialog2
      }
    }
  });
          </code>
        </pre>
      </template>
    </ContentLayout>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import useAsyncDialog from '@/hooks/useAsyncDialog';
import DialogContent from '@/forDev/testComponents/DialogContent.vue';
import ReButton from '@/components/ReButton.vue';

export default defineComponent({
  name: 'ViewAsyncDialog',
  components: {
    ReButton,
  },
  setup() {
    const { asyncDialog } = useAsyncDialog();
    const toggleDialog1 = async () => {
      const dialog = await asyncDialog({
        content: '刪除成功',
        btns: [
          {
            label: '確認',
            cb: () => {
              console.log('success');
            },
          },
          {
            label: '取消',
            cb: () => {
              console.log('cancel');
            },
          },
          {
            label: '測試',
            cb: () => {
              console.log('test');
            },
          },
        ],
      });

      console.log('dialog', dialog);
    };

    const toggleDialog2 = () => {
      asyncDialog({
        render: DialogContent,
        renderType: 'render',
        btns: [
          {
            label: '確認',
            cb: () => {
              console.log('success');
            },
          },
          {
            label: '取消',
            cb: () => {
              console.log('cancel');
            },
          },
          {
            label: '測試',
            cb: () => {
              console.log('test');
            },
          },
        ],
      });
    };

    return {
      toggleDialog1,
      toggleDialog2,
    };
  },
});
</script>

<style lang="scss" scoped></style>
