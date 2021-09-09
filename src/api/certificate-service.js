import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getCertificateList = async() => {
  const { data } = await createInstance(baseUrl).post('/certificate/list')
  return data
}

const addCertificate = async (params) => {
  const { data } = await createInstance(baseUrl).post('/certificate/add', params)
  return data
}

export default {
  getCertificateList,
  addCertificate
}
