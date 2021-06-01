import AxiosService from '@/service/axios.service'

export default class ProductService extends AxiosService {
  constructor (vm, spin) {
    super(vm, spin, 'product')
  }

  getProducts (name) {
    let requestUrl = '/query'
    if (name != null && name.trim().length > 0) {
      requestUrl += `?name=${name}`
    }
    return this.axios.get(requestUrl)
  }
}
