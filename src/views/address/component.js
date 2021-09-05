import addressService from '../../api/address-service'

export default {
  name: 'Address',
  data() {
    return {
      addresses: [],
      listLoading: false,
      dialogAddVisible: false,
      addAddressForm: {
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
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = '';
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    changeFile(file) {
      this.getBase64(file.raw).then(data => {
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
