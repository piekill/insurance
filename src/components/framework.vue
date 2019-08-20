<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 98px;
    height: 43px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 0px;
  }
  .layout-nav{
    width: 300px;
    margin-top: 0;
    margin-right: auto;
    margin-left: 120px;
    margin-bottom: 0;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" :active-name="activeMenu">
          <div class="layout-logo">
            <img src="../assets/Ping_An_Logo.png" style="max-height: 100%; max-width: 100%;"/>
          </div>
          <div class="layout-nav">
            <menu-item name="1" to="/">
              <Icon type="ios-paper"></Icon>
              名册录入
            </menu-item>
            <menu-item name="2" to="/manage" v-if="isAdmin">
              <Icon type="ios-filing"></Icon>
              管理
            </menu-item>
          </div>
        </Menu>
      </Header>
      <Content style="padding: 5px">
          <Card :bordered="false" :padding=5>
            <slot name="main-content" ></slot>
          </Card>
      </Content>
      <Footer class="layout-footer-center">2019 &copy; Piekill.com</Footer>
    </Layout>
  </div>
</template>

<script>

export default {
  props: ['activeMenu'],
  name: 'Framework',
  data() {
    return {
      isAdmin: false,
    };
  },
  created() {
    this.isAdmin = this.$store.getters.role === 'admin';
  },
};
</script>
