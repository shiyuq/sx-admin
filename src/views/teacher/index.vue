<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="showDialog"
      >
        添加教师风采
      </el-button>
    </div>
    <div class="dialog">
      <el-dialog
        :title="actionType === 'add' ? '添加教师风采' : '更新教师风采'"
        :visible.sync="dialogAddVisible"
        :width="'80%'"
      >
        <el-form :model="form">
          <el-form-item label="教师名字" :label-width="'120px'">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="教师风采图片" :label-width="'120px'">
            <el-upload
              class="avatar-uploader"
              :action="''"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="changeFile"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="教师简介" :label-width="'120px'">
            <div v-if="dialogAddVisible">
              <tinymce v-model="form.content" :height="300" />
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">
            取 消
          </el-button>
          <el-button
            v-if="actionType === 'add'"
            type="primary"
            @click="addTeacher"
          >
            确 定
          </el-button>
          <el-button v-else type="primary" @click="updateTeacher">
            更 新
          </el-button>
        </div>
      </el-dialog>
    </div>
    <el-table
      v-loading="listLoading"
      :data="teachers.items"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="180px" align="center" label="教师名称">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="教师风采图片">
        <template slot-scope="{ row }">
          <img :src="row.teacherPhotoUrl" alt="" style="height: 50px;" />
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="{ row }">
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" @click="updateRow(row)">
            更新
          </el-button>
          <el-button type="danger" size="small" @click="deleteTeacher(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size="10"
      layout="prev, pager, next"
      :total="teachers.totalCount"
      @current-change="changePage"
    />
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss" scoped></style>
