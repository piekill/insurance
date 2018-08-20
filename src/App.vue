<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
  html, body, #app, .layout, .ivu-layout{
    height: 100%;
  }
  .ivu-layout-header{
    padding: 0px 30px;
  }
  .ivu-layout-footer{
    padding: 5px 50px 10px 50px;
  }
  .ivu-modal-header{
    border-bottom: none;
  }
</style>
