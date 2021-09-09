import certificateService from '../../api/certificate-service'
import fileUtil from '../../utils/file'

export default {
  name: 'Certificate',
  data () {
    return {
      certificates: [],
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
    this.getCertificateList()
  },
  methods: {
    async getCertificateList () {
      const { data } = await certificateService.getCertificateList()
      this.certificates = data
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
      await this.getCertificateList()
      this.$message.success('资质证书添加成功')
      this.dialogAddVisible = false
    }
  }
}
