import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getCameraList = async() => {
  const { data } = await createInstance(baseUrl).post('/camera/list')
  return data
}

const addCamera = async (params) => {
  const { data } = await createInstance(baseUrl).post('/camera/add', params)
  return data
}

export default {
  getCameraList,
  addCamera
}
