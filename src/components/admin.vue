<template>
  <div class="router-view">
    <Framework activeMenu="2" v-if="isAdmin">
      <div slot="main-content">
        <Table border ref="overview" :loading="isLoading" :columns="columns"
               :data="dataList" :height="tableHeight">
        </Table>
        <div class="admin-buttons">
          <Button @click="exportFile" type="success">数据导出</Button>
          <Button @click="logout" type="warning">注销</Button>
          <Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <JsonExcel class="exportBtn" :data="dataExport" :fields="json_fields" ref="exportBtn">
          Download Data
        </JsonExcel>
      </div>
    </Framework>
    <NotFound v-else></NotFound>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import JsonExcel from 'vue-json-excel';
import Framework from './framework';
import { ADMIN_OVERVIEW, ADMIN_EXPORT } from '../common/api';
import NotFound from './errorpage';

export default {
  components: {
    Framework,
    NotFound,
    JsonExcel,
  },
  name: 'Admin',
  data() {
    return {
      columns: [
        {
          title: '年级',
          key: 'grade',
        },
        {
          title: '班级',
          key: 'class',
        },
        {
          title: '总人数',
          key: 'total',
        },
        {
          title: '已注册',
          key: 'registered',
        },
        {
          title: '更新时间',
          key: 'update_time',
          sortable: true,
        },
      ],
      dataList: [],
      dataExport: [],
      isLoading: false,
      tableHeight: 550,
      isAdmin: false,
      json_fields: {
        姓名: 'name',
        性别: 'gender',
        出生年月: 'birthday',
        身份证: 'nid',
        监护人: 'guardian',
        电话: 'phone',
        年级: 'grade',
        班级: 'class',
      },
      spinShow: false,
    };
  },
  methods: {
    handleResize() {
      this.tableHeight = `${document.documentElement.clientHeight}` - 150;
      this.$forceUpdate();
    },
    exportFile() {
      this.spinShow = true;
      window.get(ADMIN_EXPORT, null, (res) => {
        this.dataExport = res.data.data;
        this.$nextTick(() => {
          this.$refs.exportBtn.$el.click();
          this.spinShow = false;
        });
      });
    },
    logout() {
      Cookies.remove('session');
      this.$store.commit('clearState');
      this.$router.push('/login');
    },
    fetchData() {
      window.get(ADMIN_OVERVIEW, null, (res) => {
        this.dataList = res.data.data;
      });
    },
  },
  created() {
    this.isAdmin = this.$store.getters.role === 'admin';
    this.isLoading = false;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    this.isLoading = true;
    this.fetchData();
    this.handleResize();
    this.isLoading = false;
  },
};
</script>

<style scoped>
  .router-view {
    height: 100%;
  }
  .admin-buttons {
    margin-top: 5px;
    text-align: center;
  }
  .exportBtn {
    display: none;
  }
</style>
