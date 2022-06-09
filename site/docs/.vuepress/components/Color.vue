<template>
  <span class="color-container" :style="getStyle">
  </span>
</template>

<script>
export default {
  name: "Color",
  props: {
    color: ''
  },
  computed: {
    getStyle() {
      return {
        background: this.color
      }
    }
  },
};
</script>
<style>
.color-container {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-left: 2px;
  position: relative;
  top: 1px;
}
</style>
