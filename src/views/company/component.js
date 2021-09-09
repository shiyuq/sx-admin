import companyService from '../../api/company-service'
import fileUtil from '../../utils/file'

export default {
  name: 'Company',
  data () {
    return {
      companys: [],
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
    this.getCompanyList()
  },
  methods: {
    async getCompanyList () {
      const { data } = await companyService.getCompanyList()
      this.companys = data
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
      await this.getCompanyList()
      this.$message.success('企业风采添加成功')
      this.dialogAddVisible = false
    }
  }
}
