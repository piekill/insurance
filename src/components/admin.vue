<template>
  <div>
    <Framework activeMenu="2">
      <div slot="main-content">
        <Table border ref="overview" :loading="isLoading" :columns="columns"
               :data="dataList" :height="tableHeight">
        </Table>
      </div>
    </Framework>
  </div>
</template>

<script>
import Framework from './framework';
import { ADMIN_OVERVIEW } from '../common/api';

export default {
  components: {
    Framework,
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
      isLoading: false,
      tableHeight: 550,
    };
  },
  methods: {
    handleResize() {
      this.tableHeight = `${document.documentElement.clientHeight}` - 125;
      this.$forceUpdate();
    },
  },
  created() {
    this.isLoading = false;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {
    this.isLoading = true;
    window.get(ADMIN_OVERVIEW, null, (res) => {
      this.dataList = res.data.data;
    });
    this.handleResize();
    this.isLoading = false;
  },
};
</script>

<style scoped>

</style>
