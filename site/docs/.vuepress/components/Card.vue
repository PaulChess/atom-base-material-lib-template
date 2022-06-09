<template>
  <div class="card-container" :style="getStyles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    showNeumorphism: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getStyles() {
      return {
        boxShadow: this.showNeumorphism ? '9px 9px 20px #b0b0b0, -9px -9px 20px #ffffff'
          : '0 8px 12px #ebedf0'
      } 
    }
  },
};
</script>
<style>
.card-container {
  margin: 24px 0;
  padding: 10px 24px;
  border-radius: 20px;
  background-color: #fff;
  /* box-shadow: 0 8px 12px #ebedf0; */
}
</style>
