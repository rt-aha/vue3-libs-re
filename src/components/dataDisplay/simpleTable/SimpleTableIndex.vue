<template>
  <div
    class="table-wrap"
    :class="{
      'table-wrap--mt': mt,
      'table-wrap--mb': mb,
    }"
    :style="style"
  >
    <div class="table-wrap__content">
      <table class="table">
        <TableColGroup :columns-config="content.colGroup" />
        <thead v-if="content.head.length" class="table__thead">
          <tr v-for="r of content.head" :key="r.id" :style="r.trStyle || {}">
            <td
              v-for="d of r.texts"
              :key="d.t"
              :rowspan="d.rowspan && d.rowspan"
              :colspan="d.colspan && d.colspan"
              :class="{
                'no-top-border': !content.head.length,
              }"
            >
              <component :is="d.render" v-if="d.render" />

              <div v-else class="td-cell">
                <template v-for="text of d.t" :key="text.t ? text.t : text">
                  <!-- 純文字 -->
                  <p v-if="typeof text === 'string'">
                    {{ text }}
                  </p>
                  <!-- 渲染函式 -->
                  <component :is="text.renderText" v-else-if="text.renderText" />
                  <!-- 文字帶樣式 {t: 'xxx' , style: {...}} -->
                  <p v-else :style="text.style">
                    {{ text.t }}
                  </p>
                </template>
              </div>
            </td>
          </tr>
        </thead>
        <tbody class="table__tbody">
          <tr v-for="r of content.body" :key="r.id" :style="r.trStyle || {}">
            <td
              v-for="d of r.texts"
              :key="d.t"
              :rowspan="d.rowspan && d.rowspan"
              :colspan="d.colspan && d.colspan"
              :class="{
                'no-top-border': !content.head.length,
              }"
              :style="d.tdStyle"
            >
              <component :is="d.render" v-if="d.render" />

              <div v-else class="td-cell">
                <template v-for="text of d.t" :key="text.t ? text.t : text">
                  <!-- 純文字 -->
                  <p v-if="typeof text === 'string'" :style="d.style">
                    {{ text }}
                  </p>
                  <!-- 渲染函式 -->
                  <component :is="text.renderText" v-else-if="text.renderText" />
                  <!-- 文字帶樣式 {t: 'xxx' , style: {...}} -->
                  <p v-else :style="text.style">
                    {{ text.t }}
                  </p>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import TableColGroup from '@/components/dataDisplay/simpleTable/ReSimpleTableColGroup.vue';

const props = defineProps({
  content: {
    type: Object,
    default: () => ({
      colGroup: [],
      head: [],
      body: [],
    }),
  },
  style: {
    type: Object,
    default: () => ({}),
  },
  mt: {
    type: Boolean,
    default: false,
  },
  mb: {
    type: Boolean,
    default: false,
  },
},
);
</script>

<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba($c-deepblue, 0.5);
  border-radius: 10px;

  &--mt {
    margin-top: 20px;
  }

  &--mb {
    margin-bottom: 20px;
  }

  &__content {
    overflow-x: auto;
  }
}

.table {
  // border: 1px solid $c-deepblue;
  width: 100%;
  word-break: break-all;
  table-layout: fixed;
  border-collapse: collapse;

  &__thead {
    tr {
      td {
        @include padding(10px);
        @include font-normal();
        border: 1px solid rgba($c-black, 0.5);
        border-top: transparent;
        border-bottom: transparent;

        p {
          text-align: justify;
          // text-align-last: left;
          word-break: break-all;
        }

        &:first-child {
          border-left: transparent;
        }

        &:last-child {
          border-right: transparent;
        }
      }
    }
  }

  &__tbody {
    tr {
      &:first-child {
        td.no-top-border {
          vertical-align: top;
          border-top: transparent;
        }
      }

      td {
        @include padding(10px);
        @include font-normal();
        vertical-align: top;
        border: 1px solid rgba($c-black, 0.5);
        border-bottom: transparent;

        p {
          text-align: justify;
          word-break: break-all;
        }

        &:first-child {
          border-left: transparent;
        }

        &:last-child {
          border-right: transparent;
        }
      }
    }
  }
}

.td-cell {
  height: 100%;
}
@import "@/styles/share/pureText";
</style>
