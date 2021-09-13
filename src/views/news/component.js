import Tinymce from '@/components/Tinymce'
import newsService from '../../api/news-service'
export default {
  name: 'News',
  data () {
    return {
      news: {
        totalCount: 0,
        items: []
      },
      listLoading: false,
      dialogAddVisible: false,
      form: {
        type: '1',
        title: '',
        content: ''
      },
      typeList: [
        {
          code: '1',
          name: '公司新闻'
        },
        {
          code: '2',
          name: '行业动态'
        },
        {
          code: '3',
          name: '常见问题'
        }
      ],
      imageUrl: '',
      actionType: 'add'
    }
  },
  components: {
    Tinymce
  },
  created () {
    this.getNewsList({ limit: 10, offset: 0 })
  },
  methods: {
    async getNewsList ({ limit = 10, offset = 0 }) {
      const { data } = await newsService.getNewsList({ limit, offset })
      this.news = data
    },
    async changePage (currentPage) {
      await this.getNewsList({ limit: 10, offset: (currentPage - 1) * 10 })
    },
    async deleteRow (row) {
      this.$confirm('此操作将永久删除新闻动态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (!row.id) {
          this.$message({
            type: 'error',
            message: '请选择新闻动态!'
          })
          return
        }
        await newsService.deleteNews({ id: row.id })
        await this.getNewsList({ limit: 10, offset: 0 })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async updateNews () {
      await newsService.updateNews(this.form)
      await this.getNewsList({ limit: 10, offset: 0 })
      this.$message.success('新闻动态更新成功')
      this.dialogAddVisible = false
    },
    async updateRow (row) {
      this.actionType = 'update'
      this.dialogAddVisible = !this.dialogAddVisible
      this.form = {
        ...row,
        type: row.typeCode
      }
    },
    async addNews () {
      if (!this.form.type) {
        this.$message.error('请输入类型')
        return
      }
      if (!this.form.title) {
        this.$message.error('请输入新闻标题')
        return
      }
      if (!this.form.content) {
        this.$message.error('请输入新闻内容')
        return
      }
      await newsService.addNews(this.form)
      await this.getNewsList({ limit: 10, offset: 0 })
      this.$message.success('新闻动态添加成功')
      this.dialogAddVisible = false
    },
    showDialog () {
      this.actionType = 'add'
      this.dialogAddVisible = true
      this.form = {
        type: '1',
        title: '',
        content: ''
      }
    }
  }
}
