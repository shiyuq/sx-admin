import teacherService from '../../api/teacher-service'
import fileUtil from '../../utils/file'

export default {
  name: 'Teacher',
  data () {
    return {
      teachers: [],
      listLoading: false,
      dialogAddVisible: false,
      form: {
        name: '施雨强教授',
        teacherPhoto: {
          baseData: '',
          fileName: 'teacherPhoto.png'
        },
        content: '这是施雨强教授'
      },
      imageUrl: ''
    }
  },
  created () {
    this.getTeacherList()
  },
  methods: {
    async getTeacherList () {
      const { data } = await teacherService.getTeacherList()
      this.teachers = data
    },
    changeFile(file) {
      fileUtil.getBase64(file.raw).then(data => {
        this.imageUrl = data
        this.form.teacherPhoto.baseData = data
      })
    },
    async addTeacher () {
      if (!this.form.teacherPhoto.baseData) {
        this.$message.error('请上传图片')
        return
      }
      await teacherService.addTeacher(this.form)
      await this.getTeacherList()
      this.$message.success('教师风采添加成功')
      this.dialogAddVisible = false
    }
  }
}
