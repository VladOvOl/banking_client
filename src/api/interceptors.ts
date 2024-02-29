import { getAccessToken, removeFromStorage } from "@/services/auth/auth_token.service";
import axios, { CreateAxiosDefaults } from "axios";
import { errorCatch } from "./error";
import { authService } from "@/services/auth/auth.service";

const options: CreateAxiosDefaults = {
  baseURL: 'http://localhost:7777/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

const axiosWithOutAuth = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(
  config => {
    const accessToken = getAccessToken()

    if (config?.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  }
)

axiosWithOutAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expires' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ){
      originalRequest._isRetry = true
      try {
        await authService.getNewTokens()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        if(errorCatch(error) === 'jwt expires') removeFromStorage()
      }
    }
    throw error
    }
)

export { axiosWithAuth, axiosWithOutAuth}