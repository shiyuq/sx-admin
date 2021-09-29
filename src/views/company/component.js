import companyService from '../../api/company-service'
import fileUtil from '../../utils/file'

export default {
  name: 'Company',
  data () {
    return {
      companys: {
        totalCount: 0,
        items: []
      },
      listLoading: false,
      dialogAddVisible: false,
      form: {
        name: 'snwl',
        companyPhoto: {
          baseData: '',
          fileName: 'companyPhoto.png'
        }
      },
      imageUrl: ''
    }
  },
  created () {
    this.getCompanyList({ limit: 10, offset: 0 })
  },
  methods: {
    async getCompanyList ({ limit = 10, offset = 0 }) {
      const { data } = await companyService.getCompanyList({ limit, offset })
      this.companys = data
    },
    async changePage (currentPage) {
      await this.getCompanyList({ limit: 10, offset: (currentPage - 1) * 10 })
    },
    changeFile(file) {
      fileUtil.getBase64(file.raw).then(data => {
        this.imageUrl = data
        this.form.companyPhoto.baseData = data
      })
    },
    async addCompany () {
      if (!this.form.companyPhoto.baseData) {
        this.$message.error('请上传图片')
        return
      }
      await companyService.addCompany(this.form)
      await this.getCompanyList({ limit: 10, offset: 0 })
      this.$message.success('企业风采添加成功')
      this.dialogAddVisible = false
    },
    async deleteCompany(row) {
      this.$confirm('此操作将永久删除该企业, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (!row.id) {
          this.$message({
            type: 'error',
            message: '请选择企业!'
          })
        }
        await companyService.deleteCompany({ id: row.id })
        await this.getCompanyList({ limit: 10, offset: 0 })
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
    }
  }
}
