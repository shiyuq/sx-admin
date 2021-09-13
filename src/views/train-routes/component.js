import Tinymce from '@/components/Tinymce'
import addressService from '../../api/address-service'
import trainService from '../../api/train-service'
import fileUtil from '../../utils/file'

export default {
  name: 'TrainRoutes',
  data () {
    return {
      trains: {
        totalCount: 0,
        items: []
      },
      addresses: [],
      listLoading: false,
      dialogAddVisible: false,
      form: {
        title: '',
        trainPhoto: {
          baseData: '',
          fileName: 'trainRoutes.png'
        },
        addressId: '',
        isRecommend: false,
        content: ''
      },
      imageUrl: ''
    }
  },
  components: {
    Tinymce
  },
  async created () {
    await Promise.all([
      this.getAddressList(),
      this.getTrainList({ limit: 10, offset: 0 })
    ])
  },
  methods: {
    async getAddressList () {
      const { data } = await addressService.getAddresses()
      this.addresses = data
    },
    async getTrainList ({ limit = 10, offset = 0 }) {
      const { data } = await trainService.getTrainList({ limit, offset })
      this.trains = data
    },
    async changePage (currentPage) {
      await this.getTrainList({ limit: 10, offset: (currentPage - 1) * 10 })
    },
    changeFile (file) {
      fileUtil.getBase64(file.raw).then(data => {
        this.imageUrl = data
        this.form.trainPhoto.baseData = data
      })
    },
    async deleteTrains (row) {
      this.$confirm('此操作将永久删除该培训线路, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (!row.id) {
          this.$message({
            type: 'error',
            message: '请选择培训线路!'
          })
          return
        }
        await trainService.deleteTrains({ id: row.id })
        await this.getTrainList({ limit: 10, offset: 0 })
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
    async addRoutes () {
      if (!this.form.title) {
        this.$message.error('请输入活动线路名称')
        return
      }
      if (!this.form.trainPhoto.baseData) {
        this.$message.error('请上传活动线路图片')
        return
      }
      if (!this.form.addressId) {
        this.$message.error('请选择活动地点')
        return
      }
      if (!this.form.content) {
        this.$message.error('请输入活动内容')
        return
      }
      await trainService.addTrain(this.form)
      await this.getTrainList({ limit: 10, offset: 0 })
      this.$message.success('活动线路添加成功')
      this.dialogAddVisible = false
    }
  }
}
