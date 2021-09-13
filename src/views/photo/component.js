import photoService from '../../api/photo-service'
import fileUtil from '../../utils/file'

export default {
  name: 'Camera',
  data () {
    return {
      photos: [],
      listLoading: false,
      dialogAddVisible: false,
      form: {
        photo: {
          baseData: '',
          fileName: 'photo.png'
        }
      },
      imageUrl: ''
    }
  },
  created () {
    this.showImgList()
  },
  methods: {
    async showImgList () {
      this.photos = []
    },
    changeFile(file) {
      fileUtil.getBase64(file.raw).then(data => {
        this.imageUrl = data
        this.form.photo.baseData = data
      })
    },
    async uploadImg () {
      if (!this.form.photo.baseData) {
        this.$message.error('请上传图片')
        return
      }
      const { data } = await photoService.upLoadImg(this.form)
      this.$message.success('图片上传成功')
      this.dialogAddVisible = false
      this.$alert(data.url, '图片路径', {
        confirmButtonText: '确定'
      })
    }
  }
}
