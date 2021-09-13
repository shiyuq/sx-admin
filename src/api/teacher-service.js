import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getTeacherList = async(params) => {
  const { data } = await createInstance(baseUrl).post('/teacher/get-teacher-list', params)
  return data
}

const addTeacher = async (params) => {
  const { data } = await createInstance(baseUrl).post('/teacher/add', params)
  return data
}

export default {
  getTeacherList,
  addTeacher
}
