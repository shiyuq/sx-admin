import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getAddressList = async(params) => {
  const { data } = await createInstance(baseUrl).post('/train/get-train-list', params)
  return data
}

const getTrainList = async(params) => {
  const { data } = await createInstance(baseUrl).post('/address/list', params)
  return data
}

const addTrain = async (params) => {
  const { data } = await createInstance(baseUrl).post('/train/add', params)
  return data
}

export default {
  getAddressList,
  getTrainList,
  addTrain
}
