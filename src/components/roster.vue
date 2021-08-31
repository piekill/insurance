<template>
  <div>
    <Framework activeMenu="1">
      <div slot="main-content">
        <div class="pick-buttons">
          <Select v-model="gradePick" style="width:150px" size="large"
                  placeholder="请选择年级" @on-change="queryRoster">
            <Option v-for="grade in gradeList" :value="grade.value" :key="grade.value">
              {{ grade.label }}
            </Option>
          </Select>
          <Select v-model="classPick" style="width:150px" size="large"
                  placeholder="请选择班级" @on-change="queryRoster">
            <Option v-for="clasz in classList" :value="clasz.value" :key="clasz.value">
              {{ clasz.label }}
            </Option>
          </Select>
        </div>
        <div height="700px">
          <Table size="small" border ref="selection" :loading="isLoading" :columns="columns"
                 :data="dataList" :height="tableHeight" :no-data-text="noDataMsg" >
          </Table>
        </div>
        <div class="roster-buttons">
          <Button @click="handleSelectAll(true)" type="info">全选</Button>
          <Button @click="handleSelectAll(false)" type="info">清空</Button>
          <Button @click="handleShowAddRecord" type="primary">新增</Button>
          <Button @click="confirm" type="success">提交</Button>
          <Button @click="example = true" type="info">回执示例</Button>
          <Button @click="logout" type="warning">注销</Button>
        </div>
        <Modal
          v-model="confirmModal"
          title="确认提交"
          @on-ok="submit"
          width="300">
          <p>已选人数: {{ selected }}</p>
        </Modal>
        <Modal title="新增学生记录" v-model="showAddRecord" width="320"
               :mask-closable="false">
          <Form ref="addingRecord" :model="curRecord" :rules="recordRule" :label-width="100">
            <Form-item label="姓名" prop="name">
              <Input class="dc-w200" v-model="curRecord.name" autofocus="true"/>
            </Form-item>
            <Form-item label="性别" prop="gender">
              <RadioGroup v-model="curRecord.gender">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
              </RadioGroup>
            </Form-item>
            <Form-item label="出生日期" prop="birthday">
              <Input class="dc-w200" v-model="curRecord.birthday" placeholder="格式：年-月-日"/>
            </Form-item>
            <Form-item label="身份证" prop="nid">
              <Input class="dc-w200" v-model="curRecord.nid" />
            </Form-item>
            <Form-item label="监护人" prop="guardian">
              <Input class="dc-w200" v-model="curRecord.guardian" />
            </Form-item>
            <Form-item label="监护人身份证" prop="guardian_nid">
              <Input class="dc-w200" v-model="curRecord.guardian_nid" />
            </Form-item>
            <Form-item label="电话" prop="phone">
              <Input class="dc-w200" v-model="curRecord.phone" />
            </Form-item>
          </Form>
          <div slot="footer">
            <Button @click="cancelAddRecord" class="dc-ml10 dc-w80">取消</Button>
            <Button @click="onAddRecord" class="dc-ml10 dc-w80" type="primary">确认</Button>
          </div>
        </Modal>
        <Modal title="修改学生记录" v-model="showUpdateRecord" width="320"
               :mask-closable="false">
          <Form ref="updatingRecord" :model="curRecord" :rules="recordRule" :label-width="100">
            <Form-item label="姓名" prop="name">
              <Input class="dc-w200" v-model="curRecord.name" autofocus="true"/>
            </Form-item>
            <Form-item label="性别" prop="gender">
              <RadioGroup v-model="curRecord.gender">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
              </RadioGroup>
            </Form-item>
            <Form-item label="出生日期" prop="birthday">
              <Input class="dc-w200" v-model="curRecord.birthday" placeholder="格式：年-月-日"/>
            </Form-item>
            <Form-item label="身份证" prop="nid">
              <Input class="dc-w200" v-model="curRecord.nid" />
            </Form-item>
            <Form-item label="监护人" prop="guardian">
              <Input class="dc-w200" v-model="curRecord.guardian" />
            </Form-item>
            <Form-item label="监护人身份证" prop="guardian_nid">
              <Input class="dc-w200" v-model="curRecord.guardian_nid" />
            </Form-item>
            <Form-item label="电话" prop="phone">
              <Input class="dc-w200" v-model="curRecord.phone" />
            </Form-item>
          </Form>
          <div slot="footer">
            <Button @click="cancelUpdateRecord" class="dc-ml10 dc-w80">取消</Button>
            <Button @click="onUpdateRecord" class="dc-ml10 dc-w80" type="primary">确认</Button>
          </div>
        </Modal>
        <Modal v-model="example" title="回执示例" height="40%" width="60%">
          <div>
            <img src="../assets/receipt.png" style="height:100%; width:100%;"/>
          </div>
        </Modal>
      </div>
    </Framework>
  </div>
</template>
<script>
import Cookies from 'js-cookie';
import { ROSTER_CLASSLIST, ROSTER_QUERY, ROSTER_UPDATE, ROSTER_ADD, ROSTER_CHANGE } from '../common/api';
import Framework from './framework';

export default {
  components: {
    Framework,
  },
  data() {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          fixed: 'left',
        },
        {
          type: 'index',
          width: 60,
          align: 'center',
        },
        {
          title: '姓名',
          key: 'name',
          minWidth: 80,
        },
        {
          title: '性别',
          key: 'gender',
          minWidth: 70,
          maxWidth: 80,
        },
        {
          title: '出生日期',
          key: 'birthday',
          minWidth: 100,
        },
        {
          title: '身份证',
          key: 'nid',
          minWidth: 130,
        },
        {
          title: '监护人',
          key: 'guardian',
          minWidth: 80,
        },
        {
          title: '监护人身份证',
          key: 'guardian_nid',
          minWidth: 130,
        },
        {
          title: '电话',
          key: 'phone',
          minWidth: 150,
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 75,
          align: 'center',
          render: (h, params) => h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
              },
              style: {
                marginRight: '5px',
              },
              on: {
                click: () => {
                  this.updateIndex = params.index;
                  this.curRecord = this.deepcopy(this.dataList[this.updateIndex]);
                  this.showUpdateRecord = true;
                },
              },
            }, '修改'),
          ]),
        },
      ],
      dataList: [],
      gradeList: [{
        value: '初一',
        label: '初一',
      },
      {
        value: '初二',
        label: '初二',
      },
      {
        value: '初三',
        label: '初三',
      },
      {
        value: '高一',
        label: '高一',
      },
      {
        value: '高二',
        label: '高二',
      },
      {
        value: '高三',
        label: '高三',
      }],
      classList: [],
      gradePick: '',
      classPick: '',
      selected: 0,
      noDataMsg: '请选择年级和班级',
      confirmModal: false,
      tableHeight: 550,
      showAddRecord: false,
      showUpdateRecord: false,
      updateIndex: 0,
      curRecord: {
        id: '',
        name: '',
        gender: '',
        birthday: '',
        nid: '',
        guardian: '',
        guardian_nid: '',
        phone: '',
        grade: '',
        class: '',
        register: false,
        _checked: false,
      },
      recordRule: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        birthday: [
          { type: 'string',
            pattern: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
            message: '请填写正确的日期，例如2005-09-01',
            trigger: 'blur',
          },
        ],
        // nid: [
        //   { required: true, message: '请输入正确的身份证',
        //    trigger: 'blur', validator: this.validatorIdNumber },
        // ],
      },
      example: false,
    };
  },
  methods: {
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    queryRoster() {
      if (this.classPick === '' || this.gradePick === '') {
        return;
      }
      this.isLoading = true;
      window.get(ROSTER_QUERY, {
        params: {
          grade: this.gradePick,
          class: this.classPick,
        },
      }, (res) => {
        if (res.data.data.length === 0) {
          this.noDataMsg = '暂无数据';
          this.dataList = [];
          this.indexMap = {};
        } else {
          this.indexMap = {};
          let index = 0;
          this.dataList = res.data.data.map((elem) => {
            /* eslint no-underscore-dangle: ["error", { "allow": ["_checked"] }] */
            /* eslint no-param-reassign:["error", { "ignorePropertyModificationsFor": ["elem"] }] */
            const item = this.deepcopy(elem);
            if (elem.register) {
              item._checked = true;
            }
            this.indexMap[item.id] = index;
            index += 1;
            return item;
          });
        }
        this.isLoading = false;
      });
    },
    confirm() {
      this.selected = this.$refs.selection.getSelection().length;
      this.confirmModal = true;
    },
    submit() {
      const sel = this.$refs.selection.getSelection().map(x => x.id);
      this.dataList = this.dataList.map((elem) => {
        const item = this.deepcopy(elem);
        item.register = sel.includes(item.id);
        item._checked = item.register;
        return item;
      });
      window.post(ROSTER_UPDATE, this.dataList, (res) => {
        this.$Notice.success({
          title: res.data.result_code === 'success' ? '提交成功' : '提交失败',
        });
      });
    },
    handleResize() {
      this.tableHeight = `${document.documentElement.clientHeight}` - 200;
      this.$forceUpdate();
    },
    logout() {
      Cookies.remove('session');
      this.$store.commit('clearState');
      this.$router.push('/login');
    },
    handleShowAddRecord() {
      if (this.classPick === '' || this.gradePick === '') {
        this.$Message.warning('请先选择年级和班级');
      } else {
        this.showAddRecord = true;
      }
    },
    onAddRecord() {
      this.$refs.addingRecord.validate((valid) => {
        if (!valid) {
          return;
        }
        const sel = this.$refs.selection.getSelection().map(x => x.id);
        this.dataList.forEach((elem) => {
          elem.register = sel.includes(elem.id);
          elem._checked = elem.register;
        });
        this.addRecord();
      });
    },
    onUpdateRecord() {
      this.$refs.updatingRecord.validate((valid) => {
        if (!valid) {
          return;
        }
        const sel = this.$refs.selection.getSelection().map(x => x.id);
        this.dataList.forEach((elem) => {
          elem.register = sel.includes(elem.id);
          elem._checked = elem.register;
        });
        this.updateRecord();
      });
    },
    cancelAddRecord() {
      this.showAddRecord = false;
      this.$refs.addingRecord.resetFields();
    },
    cancelUpdateRecord() {
      this.showUpdateRecord = false;
      this.$refs.updatingRecord.resetFields();
    },
    addRecord() {
      this.curRecord.grade = this.gradePick;
      this.curRecord.class = this.classPick;
      window.post(ROSTER_ADD, this.curRecord, (res) => {
        if (res.data.result_code === 'success') {
          this.curRecord.id = res.data.data.id;
          this.dataList.push(this.deepcopy(this.curRecord));
          this.showAddRecord = false;
          this.$refs.addingRecord.resetFields();
        }
        this.$Notice.success({
          title: res.data.result_code === 'success' ? '新增成功' : '新增失败',
        });
      });
    },
    updateRecord() {
      window.post(ROSTER_CHANGE, this.curRecord, (res) => {
        if (res.data.result_code === 'success') {
          this.dataList.splice(this.updateIndex, 1, this.deepcopy(this.curRecord));
          this.showUpdateRecord = false;
          this.$refs.updatingRecord.resetFields();
        }
        this.$Notice.success({
          title: res.data.result_code === 'success' ? '修改成功' : '修改失败',
        });
      });
    },
    birthdayChange(date) {
      this.curRecord.birthday = date;
    },
    deepcopy(elem) {
      return JSON.parse(JSON.stringify(elem));
    },
    validatorIdNumber(rule, value, callback) {
      if (value && (!(/\d{17}[\d|x]/).test(value) || (value.length !== 18))) {
        callback(new Error('身份证号码不符合规范'));
      } else {
        callback();
      }
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
    window.get(ROSTER_CLASSLIST, null, (res) => {
      res.data.data.forEach((entry) => {
        this.classList.push({
          value: entry.clasz,
          label: entry.clasz,
        });
      });
    });
    this.handleResize();
    this.isLoading = false;
  },
};
</script>

<style scoped>
.roster-buttons{
  margin-top: 5px;
  text-align: center;
}
.pick-buttons{
  margin-bottom: 5px;
  text-align: center;
}
/deep/ .ivu-table-tip{
  font-size: 14px;
}
/deep/ .ivu-select-placeholder {
  color: #999999 !important;
}
</style>
