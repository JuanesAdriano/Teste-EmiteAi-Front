import Vue from 'vue'
import Router from 'vue-router'
import Sales from '@/components/Sales/Sales'
import CreateSale from '@/components/Sales/CreateSale'
import TransportOrders from '@/components/transport-orders/TransportOrders'
import SaleReport from '@/components/report/SaleReport'

Vue.use(Router)

const routes = [
  { path: '/', name: 'Pedidos', component: Sales },
  { path: '/createsale', name: 'Criar Pedido', component: CreateSale },
  { path: '/transportorders', name: 'Ordens de Transporte', component: TransportOrders },
  { path: '/salesreport', name: 'Relatório de Vendas', component: SaleReport }
]

const router = new Router({
  mode: 'history',
  base: '/',
  routes
})

export default router
