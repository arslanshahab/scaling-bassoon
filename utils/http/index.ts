import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL
const createInstance = () => {
  const axiosInstance = axios.create({
    baseURL,
  })

  return {
    http: axiosInstance,
  }
}

export const { http } = createInstance()
