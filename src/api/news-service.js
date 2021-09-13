import { createInstance } from './general'
import config from '../config/api-config'

const baseUrl = config.customerServiceAdmin

const getNewsList = async(params) => {
  const { data } = await createInstance(baseUrl).post('/news/get', params)
  return data
}

const addNews = async (params) => {
  const { data } = await createInstance(baseUrl).post('/news/add', params)
  return data
}

const updateNews = async (params) => {
  const { data } = await createInstance(baseUrl).post('/news/update', params)
  return data
}

const deleteNews = async (params) => {
  const { data } = await createInstance(baseUrl).post('/news/delete', params)
  return data
}

export default {
  getNewsList,
  addNews,
  updateNews,
  deleteNews
}
