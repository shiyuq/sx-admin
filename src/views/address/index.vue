<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="showDialog"
      >
        添加地址
      </el-button>
    </div>
    <div class="dialog">
      <el-dialog
        :title="actionType === 'add' ? '添加地址' : '更新地址'"
        :visible.sync="dialogAddVisible"
      >
        <el-form :model="addAddressForm">
          <el-form-item label="地址名称" :label-width="'120px'">
            <el-input v-model="addAddressForm.address" autocomplete="off" />
          </el-form-item>
          <el-form-item label="地址图片" :label-width="'120px'">
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
          <el-button
            v-if="actionType === 'add'"
            type="primary"
            @click="addAddress"
          >
            确 定
          </el-button>
          <el-button v-else type="primary" @click="updateAddress">
            更新
          </el-button>
        </div>
      </el-dialog>
    </div>
    <div class="table">
      <el-table
        v-loading="listLoading"
        :data="addresses.items"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="地址标识" width="200">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="地址名称">
          <template slot-scope="{ row }">
            <span>{{ row.address }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="地址图片">
          <template slot-scope="{ row }">
            <img :src="row.addressPhotoUrl" alt="" style="height:50px" />
          </template>
        </el-table-column>

        <el-table-column width="180px" align="center" label="创建时间">
          <template slot-scope="{ row }">
            <span>{{ row.createdTime }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="320">
          <template slot-scope="{ row }">
            <el-button type="primary" size="small" @click="updateRow(row)">
              更新
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="10"
        layout="prev, pager, next"
        :total="addresses.totalCount"
        @current-change="changePage"
      />
    </div>
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss" scoped></style>
