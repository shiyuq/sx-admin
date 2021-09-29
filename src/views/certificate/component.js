import certificateService from '../../api/certificate-service'
import fileUtil from '../../utils/file'

export default {
  name: 'Certificate',
  data () {
    return {
      certificates: {
        totalCount: 0,
        items: []
      },
      listLoading: false,
      dialogAddVisible: false,
      form: {
        certificatePhoto: {
          baseData: '',
          fileName: 'certificatePhoto.png'
        }
      },
      imageUrl: ''
    }
  },
  created () {
    this.getCertificateList({ limit: 10, offset: 0 })
  },
  methods: {
    async getCertificateList ({ limit = 10, offset = 0 }) {
      const { data } = await certificateService.getCertificateList({ limit, offset })
      this.certificates = data
    },
    async changePage (currentPage) {
      await this.getCertificateList({ limit: 10, offset: (currentPage - 1) * 10 })
    },
    changeFile(file) {
      fileUtil.getBase64(file.raw).then(data => {
        this.imageUrl = data
        this.form.certificatePhoto.baseData = data
      })
    },
    async addCertificate () {
      if (!this.form.certificatePhoto.baseData) {
        this.$message.error('请上传图片')
        return
      }
      await certificateService.addCertificate(this.form)
      await this.getCertificateList({ limit: 10, offset: 0 })
      this.$message.success('资质证书添加成功')
      this.dialogAddVisible = false
    },
    async deleteCertificate(row) {
      this.$confirm('此操作将永久删除该证书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (!row.id) {
          this.$message({
            type: 'error',
            message: '请选择证书!'
          })
          return
        }
        await certificateService.deleteCertificate({ id: row.id })
        await this.getCertificateList({ limit: 10, offset: 0 })
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
