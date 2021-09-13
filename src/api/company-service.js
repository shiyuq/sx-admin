import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getCompanyList = async(params) => {
  const { data } = await createInstance(baseUrl).post('/company/get-company-list', params)
  return data
}

const addCompany = async (params) => {
  const { data } = await createInstance(baseUrl).post('/company/add', params)
  return data
}

export default {
  getCompanyList,
  addCompany
}
