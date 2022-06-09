<template>
  <div class="demo-container">
    <iframe
      :src="demoSrc"
      frameborder="0"
      width="375px"
      height="637px"
      marginheight="0"
      marginwidth="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {};
  },
  computed: {
    curPath() {
      const execRes = /\/(\w+)\.html/.exec(this.$route.path);
      return execRes ? execRes[1] : "";
    },
    demoSrc() {
      // return "https://testm.10jqka.com.cn/vaserviece/hxmui-demo/#/" + this.curPath;
      // return "http://testm.10jqka.com.cn/cd/ths-frontend-hxmui-container/dev/index.html#/" + this.curPath;
      return "http://localhost:3800/#/"
    }
  },
  mounted() {
    const html = document.querySelector("html");
    if (html) {
      html.setAttribute("data-display-demo", true);
    }
  },
  beforeDestroy() {
    const html = document.querySelector("html");
    if (html) {
      html.removeAttribute("data-display-demo");
    }
  }
};
</script>
<style>
[data-display-demo] .demo-container {
  width: 100%;
  height: 637px;
  border-radius: 10px;
  border: 1px solid #eee;
  background-color: #fff;
  margin: 30px auto;
}
@media (min-width: 959px) {
  [data-display-demo] .theme-default-content:not(.custom),
  [data-display-demo] .page-edit,
  [data-display-demo] .page-nav {
    max-width: 740px !important;
    padding-right: 465px !important;
  }
  [data-display-demo] .demo-container {
    width: 375px;
    height: 637px;
    border-radius: 10px;
    box-shadow: 0 0 20px #eee;
    background-color: #fff;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
  }
}
</style>
