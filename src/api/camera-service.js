import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getCameraList = async(params) => {
  const { data } = await createInstance(baseUrl).post('/camera/get-camera-list', params)
  return data
}

const addCamera = async (params) => {
  const { data } = await createInstance(baseUrl).post('/camera/add', params)
  return data
}

const deleteCamera = async (params) => {
  const { data } = await createInstance(baseUrl).post('/camera/delete', params)
  return data
}

export default {
  getCameraList,
  addCamera,
  deleteCamera
}
