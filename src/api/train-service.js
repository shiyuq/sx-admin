import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getTrainList = async(params) => {
  const { data } = await createInstance(baseUrl).post('/train/get-train-list', params)
  return data
}

const addTrain = async (params) => {
  const { data } = await createInstance(baseUrl).post('/train/add', params)
  return data
}

const updateTrains = async (params) => {
  const { data } = await createInstance(baseUrl).post('/train/update', params)
  return data
}

const deleteTrains = async (params) => {
  const { data } = await createInstance(baseUrl).post('/train/delete', params)
  return data
}

export default {
  getTrainList,
  addTrain,
  updateTrains,
  deleteTrains
}
