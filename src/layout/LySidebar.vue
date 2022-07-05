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
            <p class="main-list__item__box__text">{{ ml.label }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="sub-list-wrap">
      <ul class="sub-list">
        <li class="sub-list__item" v-for="sl of subListConfig[activedType]" :key="sl.label">
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

export default defineComponent({
  name: 'LySidebar',
  setup() {
    const activedType = ref('Components');
    const mainListConfig = [
      {
        label: 'Components',
      },
      {
        label: 'Widget',
      },
      {
        label: 'Hooks',
      },
    ];

    const subListConfig = {
      Components: [
        {
          label: 'Form',
        },
        {
          label: 'AsyncDialog',
        },
        {
          label: 'Message',
        },
      ],
      Widget: [
        {
          label: 'ManagePage',
        },
        {
          label: 'Clock',
        },
      ],
      Hooks: [
        {
          label: 'deviceType',
        },
        {
          label: 'useRequest',
        },
      ],
    };

    const handleMainListItem = (label) => {
      activedType.value = label;
    };

    return {
      mainListConfig,
      subListConfig,
      activedType,
      handleMainListItem,
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
}

.sub-list {
  height: 100%;
  @include flex(flex-start, flex-start, column);

  &__item {
    &__box {
      @include padding(10px 5px);

      &__text {
        @include font-style($c-black, 14, 400, 1.5px);
      }
    }
  }
}
</style>
