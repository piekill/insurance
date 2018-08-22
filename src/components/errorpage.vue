<template>
  <div class="notfound">
    <div class="text-wrapper">
      <div class="title" data-content="404">
        404
      </div>

      <div class="subtitle">
        页面不存在
      </div>

      <div class="buttons">
        <a class="button" href="/">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">

  $color1: #EE4B5E;
  $color2: #342643;
  $color3: #1FA9D6;

  *, *:before, *:after {
    box-sizing: border-box;
  }

  .notfound {
    background-size: cover;
    font-family: sans-serif;
    background: $color2 no-repeat fixed center center;
    height: 100%;
    width: 100%;
  }

  .text-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 6em;
    font-weight: 700;
    color: $color1;
  }

  .subtitle {
    font-size: 40px;
    font-weight: 700;
    color: $color3;
  }

  .buttons {
    margin: 30px;

  a.button {
    font-weight: 700;
    border: 2px solid $color1;
    text-decoration: none;
    padding: 15px;
    text-transform: uppercase;
    color: $color1;
    border-radius: 26px;
    transition: all 0.2s ease-in-out;

  &:hover {
     background-color: $color1;
     color: white;
     transition: all 0.2s ease-in-out;
   }
  }
  }
</style>
