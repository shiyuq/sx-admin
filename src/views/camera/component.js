import cameraService from '../../api/camera-service'
import fileUtil from '../../utils/file'

export default {
  name: 'Camera',
  data () {
    return {
      cameras: [],
      listLoading: false,
      dialogAddVisible: false,
      form: {
        cameraPhoto: {
          baseData: '',
          fileName: 'cameraPhoto.png'
        }
      },
      imageUrl: ''
    }
  },
  created () {
    this.getCameraList()
  },
  methods: {
    async getCameraList () {
      const { data } = await cameraService.getCameraList()
      this.cameras = data
    },
    changeFile(file) {
      fileUtil.getBase64(file.raw).then(data => {
        this.imageUrl = data
        this.form.cameraPhoto.baseData = data
      })
    },
    async addCamera () {
      if (!this.form.cameraPhoto.baseData) {
        this.$message.error('请上传图片')
        return
      }
      await cameraService.addCamera(this.form)
      await this.getCameraList()
      this.$message.success('培训掠影添加成功')
      this.dialogAddVisible = false
    }
  }
}
