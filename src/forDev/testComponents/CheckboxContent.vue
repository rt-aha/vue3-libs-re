<template>
  <div class="comp-agreement">
    <p class="agreement-title">ＯＯＸＸ協議書</p>
    <p class="agreement-desc">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis mollitia, temporibus blanditiis debitis
      dolorum aliquam illum accusamus voluptates sed, nesciunt incidunt, ad vero est! Velit hic nesciunt ipsum harum
      ipsam soluta aperiam eum autem quos consequuntur, voluptate ipsa laboriosam facere sequi illo? Voluptas,
      laboriosam.
    </p>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.comp-agreement {
  @include padding(15px);
  border: 1px solid #ccc;
  border-radius: 10px;
}

.agreement-title {
  @include font-style($c-main, 24);
}

.agreement-desc {
  @include font-style($c-text1, 14);
}
</style>
