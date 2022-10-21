<template>
  <div class="ly-base-layout">
    <div class="ly-base-layout__header">
      <LyHeader />
    </div>

    <div class="ly-base-layout__body">
      <div class="ly-base-layout__body__sidebar">
        <LySidebar />
      </div>
      <div class="ly-base-layout__body__container">
        <p class="page-title">
          {{ $route.meta.title }}
        </p>
        <div class="router-view-wrap">
          <div class="router-view-wrap__view">
            <router-view />
          </div>
          <div v-if="isFormViewExist" class="router-view-wrap__extra-view">
            <p class="page-title--form-preview">
              用於表單時
            </p>
            <EasyForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import LyHeader from '@/layout/LyHeader.vue';
import LySidebar from '@/layout/LySidebar.vue';
import EasyForm from '@/views/dataInput/EasyForm.vue';
import ReBreadcrumb from '@/components/navigation/ReBreadcrumb.vue';
// import fds from '@/router/index'

export default defineComponent({
  components: {
    LyHeader,
    LySidebar,
    EasyForm,
  },
  setup() {
    const route = useRoute();
    const breadcrumbConfig = ref();

    // const routeMatchedLasteIndex = route.matched.length - 1;
    const isFormViewExist = computed(() => {
      // if (route.matched?.[routeMatchedLasteIndex]?.components?.form) {
      //   return true;
      // }

      console.log('route', route.meta);

      if (route.meta.category === 'dataInput') {
        if (route.name !== 'easy-form') {
          return true;
        }
      }

      return false;
    });

    const setNewBreadcrumb = () => {
      const routeNames = window.location.pathname.split('/').filter(item => item);

      console.log('routeNames', routeNames);
    };

    const routeName = computed(() => route.name);

    watch(() => routeName.value, () => {
      setNewBreadcrumb();
    }, { immediate: true });

    // const showForm = ['group'].includes(route.meta.extraView);

    return {
      route,
      isFormViewExist,
      // showForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.page-title {
  @include font-style($c-deepblue, 24, 500);

  &--form-preview {
    @include font-size(20);
  }
}

.ly-base-layout {
  // min-height: 100%;
  @include flex(flex-start, flex-start, column);
  width: 100%;
  height: 100%;

  &__header {
    position: relative;
    z-index: $zi-header;
    flex: none;
    width: 100%;
    height: auto;
  }

  &__body {
    @include flex(flex-start, flex-start);
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &__sidebar {
      // width: 220px;
      display: inline-block;
      flex: none;
      height: 100%;
    }

    &__container {
      @include padding(25px);
      flex: 1;
      height: 100%;
      overflow-y: auto;
    }
  }

  &__footer {
    position: relative;
    z-index: 10;
    flex: none;
    width: 100%;
    height: auto;
  }
}

.router-view-wrap {
  @include flex(flex-start, flex-start);
  width: 100%;

  &__view {
    // flex: none;
    // width: ;
    flex: 1;
    width: 100%;
  }

  &__extra-view {
    @include padding(0 0 0 30px);
    flex: none;
    width: 50%;
  }
}
</style>
