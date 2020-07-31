<template>
  <div class="loading-dots">
    <h1>Loading</h1>
    <h1 class="dot one">.</h1>
    <h1 class="dot two">.</h1>
    <h1 class="dot three">.</h1>
  </div>
</template>
<script>
export default {
  name: "v-loader",
};
</script>

<style lang="scss">
.loading-dots {
  text-align: center;
  z-index: 5;

  h1 {
    color: #fff;
  }
  .dot {
    display: inline;
    margin-left: 0.2em;
    margin-right: 0.2em;
    position: relative;
    top: -1em;
    font-size: 3.5em;
    opacity: 0;
    animation: showHideDot 2.5s ease-in-out infinite;

    &.one {
      animation-delay: 0.2s;
    }
    &.two {
      animation-delay: 0.4s;
    }
    &.three {
      animation-delay: 0.6s;
    }
  }
}

@keyframes showHideDot {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
