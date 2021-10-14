<template>
  <div class="app-container">
    <div class="dialog">
      <el-dialog
        title="添加用户咨询"
        :visible.sync="dialogAddVisible"
        :width="'80%'"
      >
        <el-form :model="form">
          <el-form-item label="活动线路标识" :label-width="'120px'">
            <el-input v-model="form.trainId" autocomplete="off" />
          </el-form-item>

          <el-form-item label="姓名" :label-width="'120px'">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>

          <el-form-item label="联系方式" :label-width="'120px'">
            <el-input v-model="form.phone" autocomplete="off" />
          </el-form-item>

          <el-form-item label="邮箱" :label-width="'120px'">
            <el-input v-model="form.email" autocomplete="off" />
          </el-form-item>

          <el-form-item label="咨询信息" :label-width="'120px'">
            <tinymce v-model="form.consultInfo" :height="300" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">
            取 消
          </el-button>
          <el-button type="primary" @click="addConsult">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
    <el-table
      v-loading="listLoading"
      :data="consults.items"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="180px" align="center" label="咨询标题">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="咨询信息">
        <template slot-scope="{ row }">
          <span>{{ row.consultContent }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="姓名" width="200">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="联系方式">
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="邮箱">
        <template slot-scope="{ row }">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="咨询时间">
        <template slot-scope="{ row }">
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size="10"
      layout="prev, pager, next"
      :total="consults.totalCount"
      @current-change="changePage"
    />
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss" scoped></style>
