import consultService from '../../api/consult-service'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'Consult',
  data () {
    return {
      consults: {
        totalCount: 0,
        items: []
      },
      listLoading: false,
      dialogAddVisible: false,
      form: {
        trainId: '',
        name: 'ceshi',
        phone: '110',
        email: '',
        consultContent: ''
      },
      imageUrl: ''
    }
  },
  components: {
    Tinymce
  },
  created () {
    this.getConsultList({ limit: 10, offset: 0 })
  },
  methods: {
    async getConsultList ({ limit = 10, offset = 0 }) {
      const { data } = await consultService.getConsultList({ limit, offset })
      this.consults = data
    },
    async changePage (currentPage) {
      await this.getConsultList({ limit: 10, offset: (currentPage - 1) * 10 })
    },
    async addConsult () {
      if (!this.form.trainId) {
        this.$message.error('请输入活动线路标识')
        return
      }
      if (!this.form.name) {
        this.$message.error('请输入姓名')
        return
      }
      if (!this.form.phone) {
        this.$message.error('请输入联系方式')
        return
      }
      if (!this.form.email) {
        this.$message.error('请输入邮箱')
        return
      }
      if (!this.form.consultInfo) {
        this.$message.error('请输入咨询信息')
        return
      }
      await consultService.addConsult(this.form)
      await this.getConsultList({ limit: 10, offset: 0 })
      this.$message.success(`添加用户咨询成功`)
      this.dialogAddVisible = false
    }
  }
}
