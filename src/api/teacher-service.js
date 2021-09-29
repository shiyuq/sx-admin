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

const updateTeacher = async (params) => {
  const { data } = await createInstance(baseUrl).post('/teacher/update', params)
  return data
}

const deleteTeacher = async (params) => {
  const { data } = await createInstance(baseUrl).post('/teacher/delete', params)
  return data
}

export default {
  getTeacherList,
  addTeacher,
  updateTeacher,
  deleteTeacher
}
