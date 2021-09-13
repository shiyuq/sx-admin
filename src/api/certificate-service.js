import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getCertificateList = async(params) => {
  const { data } = await createInstance(baseUrl).post('/certificate/get-certificate-list', params)
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
