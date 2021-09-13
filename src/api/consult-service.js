import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getConsultList = async(params) => {
  const { data } = await createInstance(baseUrl).post('/consult/list', params)
  return data
}

const addConsult = async (params) => {
  const { data } = await createInstance(baseUrl).post('/consult/add', params)
  return data
}

export default {
  getConsultList,
  addConsult
}
