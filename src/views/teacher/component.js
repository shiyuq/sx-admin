import Tinymce from '@/components/Tinymce'
import teacherService from '../../api/teacher-service'
import fileUtil from '../../utils/file'

export default {
  name: 'Teacher',
  data () {
    return {
      teachers: {
        totalCount: 0,
        items: []
      },
      listLoading: false,
      dialogAddVisible: false,
      form: {
        name: '',
        teacherPhoto: {
          baseData: '',
          fileName: 'teacherPhoto.png'
        },
        content: ''
      },
      imageUrl: '',
      actionType: 'add'
    }
  },
  created () {
    this.getTeacherList({ limit: 10, offset: 0 })
  },
  components: {
    Tinymce
  },
  methods: {
    async getTeacherList ({ limit = 10, offset = 0 }) {
      const { data } = await teacherService.getTeacherList({ limit, offset })
      this.teachers = data
    },
    async changePage (currentPage) {
      await this.getTeacherList({ limit: 10, offset: (currentPage - 1) * 10 })
    },
    changeFile(file) {
      fileUtil.getBase64(file.raw).then(data => {
        this.imageUrl = data
        this.form.teacherPhoto = {
          baseData: data,
          fileName: 'teacherPhoto.png'
        }
      })
    },
    async updateTeacher () {
      await teacherService.updateTeacher(this.form)
      await this.getTeacherList({ limit: 10, offset: 0 })
      this.$message.success('教师风采更新成功')
      this.dialogAddVisible = false
    },
    async updateRow (row) {
      this.actionType = 'update'
      this.dialogAddVisible = !this.dialogAddVisible
      this.imageUrl = row.teacherPhotoUrl
      this.form = {
        ...row,
        id: row.id
      }
    },
    async deleteTeacher(row) {
      this.$confirm('此操作将永久删除该教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (!row.id) {
          this.$message({
            type: 'error',
            message: '请选择教师!'
          })
          return
        }
        await teacherService.deleteTeacher({ id: row.id })
        await this.getTeacherList({ limit: 10, offset: 0 })
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
    async addTeacher () {
      if (!this.form.name) {
        this.$message.error('请输入教师名字')
        return
      }
      if (!this.form.teacherPhoto.baseData) {
        this.$message.error('请上传图片')
        return
      }
      if (!this.form.content) {
        this.$message.error('请输入教师简介')
        return
      }
      await teacherService.addTeacher(this.form)
      await this.getTeacherList({ limit: 10, offset: 0 })
      this.$message.success('教师风采添加成功')
      this.dialogAddVisible = false
    },
    showDialog () {
      this.actionType = 'add'
      this.dialogAddVisible = true
      this.form = {
        name: '',
        teacherPhoto: {
          baseData: '',
          fileName: ''
        },
        content: ''
      }
    }
  }
}
