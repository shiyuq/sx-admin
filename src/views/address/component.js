import addressService from '../../api/address-service'
import fileUtil from '../../utils/file'

export default {
  name: 'Address',
  data () {
    return {
      addresses: {
        totalCount: 0,
        items: []
      },
      listLoading: false,
      dialogAddVisible: false,
      addAddressForm: {
        address: '',
        addressPhoto: {
          baseData: '',
          fileName: ''
        }
      },
      imageUrl: '',
      actionType: 'add'
    }
  },
  created () {
    this.getAddressList({ limit: 10, offset: 0 })
  },
  methods: {
    async getAddressList ({ limit = 10, offset = 0 }) {
      const { data } = await addressService.getAddressList({ limit, offset })
      this.addresses = data
    },
    async changePage (currentPage) {
      await this.getAddressList({ limit: 10, offset: (currentPage - 1) * 10 })
    },
    changeFile(file) {
      fileUtil.getBase64(file.raw).then(data => {
        this.imageUrl = data
        this.addAddressForm.addressPhoto.baseData = data
      })
    },
    async updateAddress () {
      await addressService.updateAddress(this.addAddressForm)
      await this.getAddressList({ limit: 10, offset: 0 })
      this.$message.success('地址更新成功')
      this.dialogAddVisible = false
    },
    async updateRow (row) {
      this.actionType = 'update'
      this.dialogAddVisible = !this.dialogAddVisible
      this.addAddressForm = {
        ...row,
        id: row.id
      }
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
    },
    showDialog () {
      this.actionType = 'add'
      this.dialogAddVisible = true
      this.addAddressForm = {
        address: '',
        addressPhoto: {
          baseData: '',
          fileName: 'addressPhoto.png'
        }
      }
    }
  }
}
