import AxiosService from '@/service/axios.service'

export default class TransportOrderService extends AxiosService {
  constructor (vm, spin) {
    super(vm, spin, 'transportorder')
  }

  getTransportOrders () {
    return this.axios.get('/get')
  }
}
