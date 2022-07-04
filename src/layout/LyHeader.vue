<template>
  <div class="ly-header">ly-header</div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LyHeader',
});
</script>
<style lang="scss" scoped></style>

<style lang="scss" scoped>
@import '@/styles/utils/_rwd.scss';

.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 55%;
  @include flex(flex-start, flex-start, column);
}

.mobile-header {
  flex: none;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $zi-mobile-header;
  background-color: $c-white;

  &__content {
    width: 100%;
    height: 100%;
    background-color: $c-white;
    @include flex(space-between);
    @include padding(0 10px);
  }
}

.header-logo {
  &__img {
    width: 120px;
    vertical-align: bottom;
  }
}

.pc-header-logo {
  display: none;
}

.hbg {
  width: 35px;
  height: 35px;
  position: relative;
  cursor: pointer;
  display: inline-block;

  &__bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 35px;
    height: 4px;
    background-color: $c-main;
    transition: 0.4s;
  }
}

.ly-header {
  // display: none;

  .hbg {
    &__bar {
      &--close {
        opacity: 0;
      }

      &--open {
        box-shadow: 0 11px 0px $c-main;
        /* box-shadow: 0 11px 0px $c-main, 0px -11px 0px $c-main; */
      }
    }
  }
  .header-content {
    transition: 0.4s;
    position: fixed;
    top: -100%;
    left: 0;
    background-color: $c-grey;
    overflow: auto;

    // @include position(tl, -100%, 0);
  }

  &--active {
    .header-content {
      position: fixed;
      top: 0;
      left: 0;
      // @include position(tl, 0, 0);
    }

    .hbg {
      &__bar {
        &--close {
          opacity: 1;
          transform-origin: center;

          &--top {
            transform: rotate(-45deg);
          }

          &--bottom {
            transform: rotate(45deg);
            border: 2px solid #fff;
          }
        }

        &--open {
          opacity: 0;
          box-shadow: 0 0px 0px $c-main, 0px -0px 0px $c-main;
        }
      }
    }
  }
}

.header-content {
  width: 100%;
  flex: 1;
  background-color: $c-white;
  height: 100%;
  @include padding(107px 20px);
  z-index: $zi-mobile-header-content;
  box-sizing: border-box;

  &__content {
    @include flex(space-between, flex-start, column);
    height: 100%;
  }
}

.site-menu {
  width: 100%;
}

.nav-list {
  width: 100%;

  &__item {
    width: 100%;
    text-align: center;

    &--register {
      padding-bottom: 60px;
    }

    & + & {
      margin-top: 28px;
    }

    &__link {
      cursor: pointer;
      @include flex(center, center, column);
      position: relative;

      &__dropdown-icon {
        position: relative;
        @include position(tr, 50%, 20px);
        transform: translateY(-50%) rotate(180deg);
        transition: 0.4s;

        &--actived {
          transform: translateY(-50%) rotate(0deg);
        }
      }

      &__icon {
        display: none;
      }

      &__ch {
        @include font-style($c-grey, 18, 400, 0, 25px);
        margin-top: 4px;
      }

      &__en {
        @include font-style($c-grey, 14, 400, 0, 16px);
        margin-top: 4px;
      }
    }
  }
}

.sub-nav {
  height: 0;
  overflow: hidden;
  transition: 0.4s;

  &--actived {
    height: 127px;
  }
}

.sub-nav-list {
  @include padding(0 0 24px);
  border-bottom: 1px solid $c-grey;

  &__item {
    margin-top: 30px;

    &__link {
      @include font-style($c-grey, 18, 400, 0, 21px);
      cursor: pointer;
    }
  }
}

.other-info {
}

.social-media {
}

.social-media-list {
  &__item {
    & + & {
      margin-top: 30px;
    }
    &__icon {
      cursor: pointer;
    }
  }
}

.header-menu-logo {
  margin-top: 48px;
  width: 95px;

  &__img {
    width: 100%;
    vertical-align: bottom;
  }
}

.join-us {
  position: relative;
  display: none;

  &__icon {
    position: absolute;
    top: 50%;
    left: 8%;
    transform: translateY(-50%);
    height: 16px;
    margin-right: 8px;
    opacity: 0;
  }

  &:hover {
    .join-us__icon {
      opacity: 1;
    }
  }
}

@media screen and (min-width: $sm-pc) {
  .ly-header {
    position: relative;

    .header-content {
      overflow: visible;
      top: 0;
      height: 70px;
      @include padding(0);
      // position: fixe;
      background-color: $c-white;
      @include flex();
      box-shadow: 0px 3px 6px #00000014;

      &__content {
        margin: 0 auto;
        width: 100%;
        max-width: 1100px;
        @include flex(space-between);
      }
    }
  }
  .main-header {
    height: 70px;
    background-color: $c-white;
  }

  .mobile-header {
    display: none;
    &__content {
      height: 70px;
    }
  }

  .header-logo {
    &__img {
    }
  }

  .pc-header-logo {
    display: block;
    &__img {
      width: 120px;
    }
  }

  .hbg {
    &__bar {
      &__close {
      }

      &__open {
      }
    }
  }

  .site-menu {
    @include flex(flex-end);
    height: 70px;
  }

  .nav-list {
    width: auto;
    height: 100%;
    @include flex();

    &__item {
      width: auto;
      position: relative;
      height: 100%;
      // background-color: $c-grey;

      & + & {
        margin-top: 0px;
        margin-left: 25px;
      }

      &--register {
        display: none;
      }

      &--hide {
        display: none;
      }

      &:hover {
        .sub-nav {
          @include position(tl, 100%, 0);
          opacity: 1;

          // animation: fadeIn 0.1s forwards;
        }

        .nav-list__item__link__icon {
          display: inline-block;
        }
      }

      &__link {
        height: 100%;
        @include flex();
        position: relative;
        z-index: 10;
        cursor: pointer;
        background-color: $c-white;

        &__dropdown-icon {
          display: none;
        }

        &__icon {
          @include position(tl, 50%, 0);
          transform: translateY(-50%);
          height: 16px;
          margin-right: 8px;
        }

        &__ch {
          margin-top: 0;
          margin-left: 20px;
          @include font-style($c-grey, 16, 400, 0, 24px);
        }

        &__en {
          margin-top: 0;
          margin-left: 5px;
          @include font-style($c-grey, 16, 400, 0, 24px);
        }
      }
    }
  }

  .sub-nav {
    @include position(tl, -100%, 0);
    z-index: 5;
    opacity: 0;
    transition: 0.4s;
    // display: none;
    width: 100%;
  }

  .sub-nav-list {
    @include padding(5px 20px);
    background-color: rgba($c-grey, 0.9);
    border-bottom: 0 transparent;

    &__item {
      margin-top: 0;

      &__link {
        @include font-style($c-white, 16, 400, 0, 21px);
        @include padding(15px 0);
        text-align: left;
      }

      & + & {
        border-top: 1px solid $c-white;
      }

      &:hover {
        .sub-nav-list__item__link {
          opacity: 0.5;
        }
      }
    }
  }

  .other-info {
    @include flex();
  }

  .social-media {
  }

  .social-media-list {
    @include flex();

    &__item {
      & + & {
        margin-top: 0px;
        margin-left: 23px;
      }

      &__icon {
      }
    }
  }

  .header-menu-logo {
    margin-top: 0;
    &__img {
      margin-left: 23px;
      cursor: pointer;
    }
  }

  .join-us {
    width: 160px;
    height: 70px;
    @include flex(center);
    @include position(tr, 0, 0);
    background-color: $c-main;

    &__text {
      @include font-style($c-white, 16, 400, 0, 21px);
    }
  }
}

.register {
  @include flex(center);

  &__btn {
    height: 40px;
    border: 1px solid $c-grey;
    @include padding(0 14px);
    @include flex(center);
    cursor: pointer;
    background-color: transparent;

    &__text {
      @include font-style($c-grey, 16, 400, 0.16px, 18px);
    }
  }
}

@media screen and (min-width: $lg-pc) {
  .ly-header {
    .header-content {
      &__content {
        max-width: 1366px;
      }
    }
  }

  .nav-list {
    &__item {
      & + & {
        margin-left: 60px;
      }
    }
  }

  .join-us {
    width: 200px;
  }
}
</style>
