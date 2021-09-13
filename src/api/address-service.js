import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getAddressList = async(params) => {
  const { data } = await createInstance(baseUrl).post('/address/get-address-list', params)
  return data
}

const addAddress = async (params) => {
  const { data } = await createInstance(baseUrl).post('/address/add', params)
  return data
}

export default {
  getAddressList,
  addAddress
}
