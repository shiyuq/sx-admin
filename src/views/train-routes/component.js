import addressService from '../../api/address-service'
import fileUtil from '../../utils/file'

export default {
  name: 'Address',
  data() {
    return {
      addresses: [],
      listLoading: false,
      dialogAddVisible: false,
      form: {
        address: '',
        addressPhoto: {
          baseData: '',
          fileName: 'addressPhoto.png'
        }
      },
      imageUrl: ''
    }
  },
  created () {
    this.getAddressList()
  },
  methods: {
    async getAddressList () {
      const {data} = await addressService.getAddressList()
      this.addresses = data
    },
    changeFile(file) {
      fileUtil.getBase64(file.raw).then(data => {
        this.imageUrl = data
        this.addAddressForm.addressPhoto.baseData = data
      })
    },
    async addAddress () {
      if (!this.addAddressForm.address) {
        this.$message.error('请输入地址名称')
        return
      }
      if (!this.addAddressForm.addressPhoto.baseData) {
        this.$message.error('请上传图片')
        return
      }
      await addressService.addAddress(this.addAddressForm)
      await this.getAddressList()
      this.$message.success('地址添加成功')
      this.dialogAddVisible = false
    }
  }
};
