<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="dialogAddVisible = true"
      >
        添加活动线路
      </el-button>
    </div>
    <div class="dialog">
      <el-dialog
        title="添加活动线路"
        :visible.sync="dialogAddVisible"
        :width="'80%'"
      >
        <el-form :model="form">
          <el-form-item label="请选择活动地点" :label-width="'120px'">
            <el-select v-model="form.addressId" placeholder="请选择活动地点">
              <el-option
                v-for="item in addresses"
                :key="item.id"
                :label="item.address"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" :label-width="'120px'">
            <el-input v-model="form.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="是否推荐" :label-width="'120px'">
            <el-switch
              v-model="form.isRecommend"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
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
          <el-form-item label="活动路线内容" :label-width="'120px'">
            <div v-if="dialogAddVisible">
              <tinymce v-model="form.content" :height="300" />
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRoutes">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table
      v-loading="listLoading"
      :data="trains.items"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column width="180px" align="center" label="地址名称">
        <template slot-scope="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="活动标题">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="活动图片">
        <template slot-scope="{ row }">
          <img :src="row.addressPhotoUrl" alt="" style="height:50px" />
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="{ row }">
          <span>{{ row.createdTime }}</span>
        </template>
      </el-table-column>

      <el-table-column width="280px" align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="danger" size="small" @click="deleteTrains(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size="10"
      layout="prev,pager,next"
      :total="trains.totalCount"
      @current-change="changePage"
    />
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss" scoped></style>
