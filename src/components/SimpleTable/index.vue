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
        <table-col-group :columnsConfig="content.colGroup" />
        <thead class="table__thead" v-if="content.head.length">
          <tr v-for="r of content.head" :key="r.id" :style="r.style || {}">
            <td
              v-for="d of r.texts"
              :key="d.t"
              :rowspan="d.rowspan && d.rowspan"
              :colspan="d.colspan && d.colspan"
              :class="{
                'no-top-border': !content.head.length,
              }"
            >
              <component :is="d.render" v-if="d.render"></component>
              <template v-else-if="Array.isArray(d.t)">
                <div class="td-cell">
                  <template v-for="text of d.t" :key="text.t ? text.t : text">
                    <p v-if="typeof text === 'string'" :style="text.style">{{ text }}</p>
                    <p v-else :style="text.style">{{ text.t }}</p>
                  </template>
                </div>
              </template>
              <p :style="d.style" v-else>{{ d.t }}</p>
            </td>
          </tr>
        </thead>
        <tbody class="table__tbody">
          <tr v-for="r of content.body" :key="r.id" :style="r.style || {}">
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
              <component :is="d.render" v-if="d.render"></component>
              <template v-else-if="Array.isArray(d.t)">
                <div class="td-cell">
                  <template v-for="text of d.t" :key="text.t ? text.t : text">
                    <p v-if="typeof text === 'string'" :style="text.style">{{ text }}</p>
                    <component v-else-if="text.renderText" :is="text.renderText"></component>
                    <p v-else :style="text.style">{{ text.t }}</p>
                  </template>
                </div>
              </template>
              <p :style="d.style" v-else>{{ d.t }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import TableColGroup from '@/components/SimpleTable/TableColGroup.vue';

export default defineComponent({
  name: 'HighRiskHypetension',
  components: {
    TableColGroup,
  },
  props: {
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
      default: true,
    },
    mb: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  overflow: hidden;
  border: 1px solid rgba($c-main, 0.5);
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
  // border: 1px solid $c-main;
  width: 100%;
  table-layout: fixed;
  word-break: break-all;
  border-collapse: collapse;

  &__thead {
    tr {
      td {
        border: 1px solid rgba($c-main, 0.5);
        border-top: transparent;
        border-bottom: transparent;
        @include padding(10px);
        @include font-normal();

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
          border-top: transparent;
          vertical-align: top;
        }
      }

      td {
        border: 1px solid rgba($c-main, 0.5);
        border-bottom: transparent;
        @include padding(10px);
        @include font-normal();
        vertical-align: top;

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

@import '@/styles/share/pureText.scss';
</style>
