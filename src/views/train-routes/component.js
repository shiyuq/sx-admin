import Tinymce from '@/components/Tinymce'
import addressService from '../../api/address-service'
import fileUtil from '../../utils/file'

export default {
  name: 'TrainRoutes',
  data () {
    return {
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
  created () {
    this.getAddressList()
  },
  methods: {
    async getAddressList () {
      const { data } = await addressService.getAddressList()
      this.addresses = data
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
      await addressService.addAddress(this.addAddressForm)
      await this.getAddressList()
      this.$message.success('地址添加成功')
      this.dialogAddVisible = false
    }
  }
}
