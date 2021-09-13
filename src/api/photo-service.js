import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const upLoadImg = async (params) => {
  const { data } = await createInstance(baseUrl).post('/photo/upload', params)
  return data
}

export default {
  upLoadImg
}
