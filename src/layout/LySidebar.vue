<template>
  <div class="ly-sidebar">
    <div class="main-list-wrap">
      <ul class="main-list">
        <li
          class="main-list__item"
          :class="{
            'main-list__item--actived': ml.label === activedType,
          }"
          v-for="ml of mainListConfig"
          :key="ml.label"
          @click="handleMainListItem(ml.label)"
        >
          <div class="main-list__item__box">
            <p class="main-list__item__box__text">{{ capitalize(ml.label) }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="sub-list-wrap">
      <ul class="sub-list">
        <li
          class="sub-list__item"
          :class="{
            'sub-list__item--actived': sl.name === route.name,
          }"
          v-for="sl of subListConfig[activedType]"
          :key="sl.label"
          @click="toPage(sl.name)"
        >
          <div class="sub-list__item__box">
            <p class="sub-list__item__box__text">{{ sl.label }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { children as components } from '@/router/pages/components';
import { children as hooks } from '@/router/pages/hooks';
import { children as widgets } from '@/router/pages/widgets';
import { children as compForm } from '@/views/compForm/compForm';
import { toCamel } from '@/utils/toCamel';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import capitalize from '@/utils/capitalize';

export default defineComponent({
  name: 'LySidebar',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const activedType = ref('components');
    const mainListConfig = [
      {
        label: 'components',
      },
      {
        label: 'compForm',
      },
      {
        label: 'widgets',
      },
      {
        label: 'hooks',
      },
    ];

    const subListConfig = {
      components: components.map((item) => {
        return {
          label: toCamel(item.name),
          name: item.name,
        };
      }),
      widgets: widgets.map((item) => {
        return {
          label: toCamel(item.name),
          name: item.name,
        };
      }),
      hooks: hooks.map((item) => {
        return {
          label: toCamel(item.name),
          name: item.name,
        };
      }),
      compForm: compForm.map((item) => {
        return {
          label: toCamel(item.name),
          name: item.name,
        };
      }),
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
      const categories = mainListConfig.map((item) => item.label);

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
  height: 100%;
  position: relative;
  background-color: rgba($c-grey, 0.1);
}

.main-list-wrap {
  @include position(tl, 0, 0);
}
.main-list {
  height: 100%;
  @include flex(flex-start, flex-start, column);

  &__item {
    cursor: pointer;

    &--actived {
      background-color: $c-grey;
    }

    &__box {
      @include padding(10px 5px);
      box-shadow: -4px -4px 10px $c-grey;

      &__text {
        writing-mode: vertical-lr;
        @include font-style($c-black, 14, 400, 1.5px);
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
  height: 100%;
  @include flex(flex-start, flex-start, column);

  &__item {
    &--actived {
      .sub-list__item__box__text {
        &::before {
          content: '';
          width: 100%;
          height: 1px;
          @include position(bl, -4px, 0);
          background-color: $c-main;
          opacity: 1;
        }
      }
    }

    &__box {
      @include padding(10px 5px);

      &__text {
        @include font-style($c-black, 14, 400, 1.5px);
        cursor: pointer;
        position: relative;

        &:before {
          content: '';
          width: 0%;
          height: 1px;
          @include position(bl, -4px, 0);
          background-color: $c-main;
          opacity: 0;
          transition: 0.4s;
        }

        &:hover {
          &::before {
            width: 100%;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
