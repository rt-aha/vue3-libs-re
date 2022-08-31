<template>
  <div class="comp-phone-option">
    <div class="phone-name-desc">
      <p class="phone-name-desc__name">{{ $attrs.label }}</p>
      <p class="phone-name-desc__price">{{ $attrs.price }}</p>
    </div>
    <p class="phone-color">{{ $attrs.color }}</p>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.comp-phone-option {
  @include flex(flex-start, flex-start, column);
  @include padding(5px 0);
}

.phone-name-desc {
  @include flex(flex-start, flex-start);
  @include font-style($c-text1, 14);
  white-space: nowrap;

  &__price {
    margin-left: 5px;
  }
}

.phone-color {
  margin-top: 6px;
  @include font-style($c-text1, 14);
}
</style>
