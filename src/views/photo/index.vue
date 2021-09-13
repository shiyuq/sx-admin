<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="dialogAddVisible = true"
      >
        上传图片
      </el-button>
    </div>
    <div class="dialog">
      <el-dialog title="上传图片" :visible.sync="dialogAddVisible">
        <el-form :model="form">
          <el-form-item label="上传图片" :label-width="'120px'">
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
          <el-button type="primary" @click="uploadImg">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
    <el-table
      v-loading="listLoading"
      :data="photos.items"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="180px" align="center" label="图片地址">
        <template slot-scope="{ row }">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>

      <el-table-column width="280px" align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="danger" size="small" @click="deleteCamera(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss" scoped></style>
