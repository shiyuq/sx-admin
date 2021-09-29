import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getAddressList = async(params) => {
  const { data } = await createInstance(baseUrl).post('/address/get-address-list', params)
  return data
}

const getAddresses = async () => {
  const { data } = await createInstance(baseUrl).post('/address/list')
  return data
}

const addAddress = async (params) => {
  const { data } = await createInstance(baseUrl).post('/address/add', params)
  return data
}

const updateAddress = async (params) => {
  const { data } = await createInstance(baseUrl).post('/address/update', params)
  return data
}

const deleteAddress = async (params) => {
  const { data } = await createInstance(baseUrl).post('/address/delete', params)
  return data
}

export default {
  getAddressList,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
}
