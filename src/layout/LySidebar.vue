<template>
  <div class="ly-sidebar">
    <div class="main-list-wrap">
      <ul class="main-list">
        <li
          v-for="ml of mainListConfig"
          :key="ml.label"
          class="main-list__item"
          :class="{
            'main-list__item--actived': ml.label === activedType,
          }"
          @click="handleMainListItem(ml.label)"
        >
          <div class="main-list__item__box">
            <p class="main-list__item__box__text">
              {{ capitalize(ml.label) }}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="sub-list-wrap">
      <ul class="sub-list">
        <li
          v-for="sl of subListConfig[activedType]"
          :key="sl.label"
          class="sub-list__item"
          :class="{
            'sub-list__item--actived': sl.name === route.name,
          }"
          @click="toPage(sl.name)"
        >
          <div class="sub-list__item__box">
            <p class="sub-list__item__box__text">
              {{ sl.label }} {{ sl.manualTesting && '(v)' }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { children as common } from '@/router/pages/common';
import { children as dataDisplay } from '@/router/pages/dataDisplay';
import { children as dataInput } from '@/router/pages/dataInput';
import { children as navigation } from '@/router/pages/navigation';
import { children as feedback } from '@/router/pages/feedback';
// import { children as compForm } from '@/views/compForm/compForm';
import { toCamel } from '@/utils/toCamel';
import capitalize from '@/utils/capitalize';

export default defineComponent({
  name: 'LySidebar',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const activedType = ref('dataDisplay');
    const mainListConfig = [
      {
        label: 'common',
      },
      {
        label: 'dataDisplay',
      },
      {
        label: 'dataInput',
      },
      {
        label: 'navigation',
      },
      {
        label: 'feedback',
      },
    ];

    const subListConfig = {
      common: common.map((item) => {
        return {
          label: toCamel(item.name),
          name: item.name,
          manualTesting: item.meta.manualTesting,
        };
      }),
      dataDisplay: dataDisplay.map((item) => {
        return {
          label: toCamel(item.name),
          name: item.name,
          manualTesting: item.meta.manualTesting,
        };
      }),
      dataInput: dataInput.map((item) => {
        return {
          label: toCamel(item.name),
          name: item.name,
          manualTesting: item.meta.manualTesting,
        };
      }),
      navigation: navigation.map((item) => {
        return {
          label: toCamel(item.name),
          name: item.name,
          manualTesting: item.meta.manualTesting,
        };
      }),
      feedback: feedback.map((item) => {
        return {
          label: toCamel(item.name),
          name: item.name,
          manualTesting: item.meta.manualTesting,
        };
      }),
      // dataInput: dataInput.map((item) => {
      //   return {
      //     label: toCamel(item.name),
      //     name: item.name,
      //   };
      // }),
    };

    const handleMainListItem = (label) => {
      activedType.value = label;
    };

    const toPage = (name) => {
      router.push({
        name,
      });
    };

    const setActivedMenu = () => {
      const categories = mainListConfig.map(item => item.label);

      if (categories.includes(route.meta.category)) {
        activedType.value = route.meta.category;
      }
    };

    setActivedMenu();

    return {
      mainListConfig,
      subListConfig,
      activedType,
      handleMainListItem,
      toPage,
      route,
      capitalize,
    };
  },
});
</script>

<style lang="scss" scoped>
.ly-sidebar {
  position: relative;
  height: 100%;
  background-color: rgba($c-grey, 0.1);
}

.main-list-wrap {
  @include position(tl, 0, 0);
}

.main-list {
  @include flex(flex-start, flex-start, column);
  height: 100%;

  &__item {
    cursor: pointer;

    &--actived {
      background-color: $c-grey;
    }

    &__box {
      @include padding(10px 5px);
      box-shadow: -4px -4px 10px $c-grey;

      &__text {
        @include font-style($c-black, 14, 400, 1.5px);
        writing-mode: vertical-lr;
      }
    }
  }
}

.sub-list-wrap {
  @include padding(15px 15px 15px 50px);
  width: 250px;
  height: 100%;
  overflow-y: auto;
}

.sub-list {
  @include flex(flex-start, flex-start, column);
  height: 100%;

  &__item {
    &--actived {
      .sub-list__item__box__text {
        font-weight: 700;

        &::before {
          @include position(bl, 3px, 5px);
          width: 100%;
          height: 5px;
          content: "";
          background-color: $c-main-pink;
          opacity: 0.4;
        }
      }
    }

    &__box {
      @include padding(10px 5px);

      &__text {
        @include font-style($c-black, 14, 400, 1.5px);
        position: relative;
        cursor: pointer;

        &::before {
          @include position(bl, 3px, 5px);
          z-index: -1;
          width: 0%;
          height: 5px;
          content: "";
          background-color: $c-main-pink;
          opacity: 0;
          transition: 0.4s;
        }

        &:hover {
          &::before {
            width: 100%;
            background-color: $c-main-pink;
            opacity: 0.4;
          }
        }
      }
    }
  }
}
</style>
