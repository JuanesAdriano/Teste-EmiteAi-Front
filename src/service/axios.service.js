import axios from 'axios'

export default class AxiosService {
  constructor (vm, spin, service) {
    this.url = 'http://localhost:8080/emiteai/'
    if (service == null) service = ''

    this.axios = axios.create({
      baseURL: `${this.url + service.trim()}/`
    })

    this.axios.interceptors.response.use(
      response => {
        return response
      },
      error => {
        alert('ERRROO')
        let msg = error.message
        if (error.response && error.response.data && error.response.data.message !== null) {
          msg = error.response.data.message
        }

        vm.$dialogs.showError(msg)

        return Promise.reject(error)
      }
    )
  }
}
