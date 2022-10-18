<template>
  <div
    class="c-mi-button"
    :class="[
      `c-mi-button--${type}`,
      {
        'c-mi-button--ml': ml,
      },
    ]"
  >
    <button
      class="mi-button"
      :class="[{ 'mi-button--disabled': disabled || isLoading, 'mi-button--small': small }, gtmClass]"
      :disabled="disabled || isLoading"
      @click="onClick"
    >
      <loading v-if="isLoading" />
      <div v-if="icon" class="c-mi-button__icon" :class="`c-mi-button__icon--${icon}`" />
      <slot />
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MiButton',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'normal',
    },
    icon: {
      type: String,
      default: '',
    },
    small: {
      type: Boolean,
      default: false,
    },
    ml: {
      type: Boolean,
      default: false,
    },
    gtmClass: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const onClick = (e) => {
      emit('click', e);
    };

    return {
      onClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.c-mi-button {
  &--ml {
    margin-left: 10px;
  }

  &--normal {
    .mi-button {
      color: $c-white;
      background-color: $c-deepblue;
      border: 1px transparent solid;

      &:hover {
        color: $c-deepblue;
        background-color: transparent;
        border: 1px $c-deepblue solid;
      }
    }
  }

  &--border {
    .mi-button {
      color: $c-deepblue;
      background-color: $c-white;
      border: 1px solid $c-deepblue;
    }
  }

  &--border-white {
    .mi-button {
      color: $c-white;
      background-color: transparent;
      border: 1px solid $c-white;
    }
  }

  &__icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-position: center;
    background-size: 24px 24px;
    // margin-right: 8px;

    &--email {
      background-image: url("~@/assets/searchResults/icon_popup_share_email.svg");
    }

    &--link {
      width: 20px;
      height: 20px;
      background-image: url("~@/assets/searchResults/icon_popup_share_link.svg");
      background-size: 20px 20px;
    }

    &--download {
      width: 16px;
      height: 16px;
      background-image: url("~@/assets/feedbackImg/icon_download.svg");
      background-size: 16px 16px;
      // background-image: url('~@/assets/icon/icon_download.svg');
    }

    &--add {
      width: 16px;
      height: 16px;
      background-image: url("~@/assets/feedbackImg/icon_add.svg");
      background-size: 16px 16px;
      // background-image: url('~@/assets/icon/icon_add.svg');
    }

    &--upload-video {
      width: 20px;
      height: 20px;
      background-image: url("~@/assets/myMusic/icon_video_upload_white.svg");
      background-size: 20px 20px;
    }

    &--sync-preview-play {
      width: 16px;
      height: 16px;
      background-image: url("~@/assets/myMusic/icon_video_play_white.svg");
      background-size: 16px 16px;
    }

    &--sync-preview-pause {
      width: 16px;
      height: 16px;
      background-image: url("~@/assets/icon/playbar_pause_white.svg");
      background-size: 16px 16px;
    }
  }

  &:hover {
    .c-mi-button__icon {
      &--email {
        background-image: url("~@/assets/searchResults/icon_popup_share_email_active.svg");
      }

      &--link {
        background-image: url("~@/assets/searchResults/icon_popup_share_link_active.svg");
      }

      &--download {
        background-image: url("~@/assets/feedbackImg/icon_download_active.svg");
        // background-image: url('~@/assets/icon/icon_download_active.svg');
      }

      &--add {
        background-image: url("~@/assets/feedbackImg/icon_add_active.svg");
        // background-image: url('~@/assets/icon/icon_add.svg');
      }

      &--upload-video {
        background-image: url("~@/assets/myMusic/icon_video_upload_red.svg");
      }

      &--sync-preview-play {
        background-image: url("~@/assets/myMusic/icon_video_play_red.svg");
      }

      &--sync-preview-pause {
        background-image: url("~@/assets/icon/playbar_pause_red.svg");
      }
    }
  }
}

.mi-button {
  @include padding(0 15px);
  @include font-style($c-white, 14, 400, 0.7px);
  @include inline-flex(center, center);
  width: auto;
  height: 40px;
  cursor: pointer;
  border-radius: 20px;
  outline: 0 transparent;
  transition: 0.3s;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--small {
    height: 32px;
  }
}
</style>
