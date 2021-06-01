import AxiosService from '@/service/axios.service'

export default class SaleService extends AxiosService {
  constructor (vm, spin) {
    super(vm, spin, 'sale')
  }

  getSaleById (id) {
    if (id != null) {
      return this.axios.get(`/${id}`)
    }
    return null
  }

  getSales () {
    return this.axios.get('/get?l=25')
  }

  createSale (saleSetup) {
    if (saleSetup != null) {
      return this.axios.post('/', saleSetup)
    }
  }

  getReportSales () {
    return this.axios.get('/getReportSales')
  }
}
