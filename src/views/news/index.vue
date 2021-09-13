<template>
  <div class="app-container">
    <div style="margin-bottom: 10px;">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="showDialog"
      >
        添加新闻动态
      </el-button>
    </div>
    <div class="dialog">
      <el-dialog
        :title="actionType === 'add' ? '添加新闻动态' : '更新新闻动态'"
        :visible.sync="dialogAddVisible"
        :width="'80%'"
      >
        <el-form v-model="form">
          <el-form-item label="请选择新闻类型" :label-width="'120px'">
            <el-select v-model="form.type" placeholder="请选择新闻类型">
              <el-option
                v-for="item in typeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="新闻标题" :label-width="'120px'">
            <el-input v-model="form.title" autocomplete="off" />
          </el-form-item>

          <el-form-item label="新闻内容" :label-width="'120px'">
            <tinymce v-model="form.content" :height="300" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">
            取 消
          </el-button>
          <el-button
            v-if="actionType === 'add'"
            type="primary"
            @click="addNews"
          >
            确 定
          </el-button>
          <el-button v-else type="primary" @click="updateNews">
            更 新
          </el-button>
        </div>
      </el-dialog>
    </div>
    <el-table
      v-loading="listLoading"
      :data="news.rows"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="新闻标识" width="200">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="类型名称">
        <template slot-scope="{ row }">
          <span>{{ row.typeName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="新闻标题">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="280px" align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" @click="updateRow(row)">
            更新
          </el-button>
          <el-button type="danger" size="small" @click="deleteRow(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size="10"
      layout="prev, pager, next"
      :total="news.count"
      @current-change="changePage"
    />
  </div>
</template>

<script src="./component.js"></script>
<style lang="scss" src="./style.scss" scoped></style>
