import cameraService from '../../api/camera-service'
import fileUtil from '../../utils/file'

export default {
  name: 'Camera',
  data () {
    return {
      cameras: {
        totalCount: 0,
        items: []
      },
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
    this.getCameraList({ limit: 10, offset: 0 })
  },
  methods: {
    async getCameraList ({ limit = 10, offset = 0 }) {
      const { data } = await cameraService.getCameraList({ limit, offset })
      this.cameras = data
    },
    async changePage (currentPage) {
      await this.getCameraList({ limit: 10, offset: (currentPage - 1) * 10 })
    },
    changeFile(file) {
      fileUtil.getBase64(file.raw).then(data => {
        this.imageUrl = data
        this.form.cameraPhoto.baseData = data
      })
    },
    async deleteCamera (row) {
      this.$confirm('此操作将永久删除该培训掠影, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (!row.id) {
          this.$message({
            type: 'error',
            message: '请选择培训掠影!'
          })
          return
        }
        await cameraService.deleteCamera({ id: row.id })
        await this.getCameraList({ limit: 10, offset: 0 })
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
    async addCamera () {
      if (!this.form.cameraPhoto.baseData) {
        this.$message.error('请上传图片')
        return
      }
      await cameraService.addCamera(this.form)
      await this.getCameraList({ limit: 10, offset: 0 })
      this.$message.success('培训掠影添加成功')
      this.dialogAddVisible = false
    }
  }
}
