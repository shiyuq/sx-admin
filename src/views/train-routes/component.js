import Tinymce from '@/components/Tinymce'
import addressService from '../../api/address-service'
import trainService from '../../api/train-service'
import fileUtil from '../../utils/file'

export default {
  name: 'TrainRoutes',
  data () {
    return {
      addresses: {
        totalCount: 0,
        items: []
      },
      trains: [],
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
      this.getAddressList({ limit: 10, offset: 0 }),
      this.getTrainList()
    ])
  },
  methods: {
    async getAddressList ({ limit = 10, offset = 0 }) {
      const { data } = await addressService.getAddressList({ limit, offset })
      this.addresses = data
    },
    async changePage (currentPage) {
      await this.getAddressList({ limit: 10, offset: (currentPage - 1) * 10 })
    },
    async getTrainList () {
      const { data } = await trainService.getTrainList()
      this.trains = data
      console.log(this.trains)
    },
    changeFile (file) {
      fileUtil.getBase64(file.raw).then(data => {
        this.imageUrl = data
        this.form.trainPhoto.baseData = data
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
      await this.getTrainList()
      this.$message.success('活动线路添加成功')
      this.dialogAddVisible = false
    }
  }
}
