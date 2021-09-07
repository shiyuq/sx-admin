import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getTrainList = async() => {
  const { data } = await createInstance(baseUrl).post('/train/list')
  return data
}

const addTrain = async (params) => {
  const { data } = await createInstance(baseUrl).post('/train/add', params)
  return data
}

export default {
  getTrainList,
  addTrain
}
