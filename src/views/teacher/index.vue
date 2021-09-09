<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="dialogAddVisible = true"
      >
        添加教师风采
      </el-button>
    </div>
    <div class="dialog">
      <el-dialog title="添加教师风采" :visible.sync="dialogAddVisible">
        <el-form :model="form">
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">
            取 消
          </el-button>
          <el-button type="primary" @click="addTeacher">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
    <el-table
      v-loading="listLoading"
      :data="teachers"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="教师风采标识" width="200">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="教师风采图片">
        <template slot-scope="{ row }">
          <img :src="row.teacherPhotoUrl" alt="" style="height: 50px;" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss" scoped></style>
