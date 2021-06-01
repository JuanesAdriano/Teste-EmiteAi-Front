<template>
 <v-container>
   <v-row>
     <v-col :cols="12">
       <v-simple-table>
         <thead>
         <tr>
           <th class="text-left">
             ID
           </th>
           <th class="text-left">
             Código Pedido
           </th>
           <th class="text-left">
             Cliente
           </th>
           <th class="text-center">
           </th>
         </tr>
         </thead>
         <tbody>
          <tr
            v-for="order in fetchedOrders"
            :key="order.id"
          >
            <td>{{ order.id }}</td>
            <td>{{ order.sale.code.code }}</td>
            <td>{{ order.infos.clientName }}</td>
            <td width="10">
              <v-btn rounded dark class="elevation-0" color="deep-purple darken-1" @click="openViewDialog(order)"><v-icon>mdi-eye</v-icon></v-btn>
            </td>
          </tr>
         </tbody>
       </v-simple-table>
     </v-col>
   </v-row>
     <v-dialog
       fullscreen
       v-model="viewDialogOpen"
       hide-overlay
       transition="dialog-bottom-transition"
     >
       <v-card color="gray lighten-4" v-if="selectedOrder != null">
         <v-toolbar dark color="indigo lighten-2">
           <v-btn dark icon @click="viewDialogOpen = false"><v-icon>mdi-close</v-icon></v-btn>
           <v-toolbar-title v-if="selectedOrder != null">Ordem de Transporte {{selectedOrder.id}}</v-toolbar-title>
         </v-toolbar>
         <div style="width: 90%; margin-left: 3%" id="orderTransportPrint">
           <v-row class="mt-5 cell">
            <v-col :cols="3">
             <b>Código Pedido:</b>: {{selectedOrder.sale.code.code }}
            </v-col>
            <v-col  :cols="3" :offset="6">
             <b>Ordem de Transporte:</b>: {{selectedOrder.id }}
            </v-col>
           </v-row>
           <v-row>
             <v-col :cols="6" class="cell">
               <b>Destinatário:</b>: {{ selectedOrder.infos.clientName }}
             </v-col>
             <v-col :cols="6" class="cell">
               <b>Documento:</b>: {{selectedOrder.infos.document}}
             </v-col>
           </v-row>
           <v-row class="cell mt-12">
             <v-col :cols="12">
               <span style="font-size: 15px"> &nbsp; Produtos</span>
             </v-col>
           </v-row>
           <v-row style="border-bottom: 1px solid #111320">
             <v-col :cols="4" class="cellSides grey-back">
               DESCRIÇÂO
             </v-col>
             <v-col :cols="2" class="cellSides grey-back">
               QTD
             </v-col>
             <v-col :cols="3" class="cellSides grey-back">
              VALOR UN
             </v-col>
             <v-col :cols="3" class="cellSides grey-back">
               VALOR TOTAL
             </v-col>
           </v-row>
           <v-row v-for="product in selectedOrder.sale.products" :key="product.id"  style="border-bottom: 1px solid #111320">
             <v-col :cols="4" class="cellSides">
               <b>{{ product.product.name }}</b>
             </v-col>
             <v-col :cols="2" class="cellSides">
               <b>{{product.amount}}</b>
             </v-col>
             <v-col :cols="3" class="cellSides">
               <b>{{ product.product.unitaryPrice | currencyLong }}</b>
             </v-col>
             <v-col :cols="3" class="cellSides">
               <b>{{ product.totalValue | currencyLong}}</b>
             </v-col>
           </v-row>
           <v-row>
             <v-col :cols="3" :offset="9" class="cell">
               <b>TOTAL:</b> {{selectedOrder.sale.saleValue | currencyLong}}
             </v-col>
           </v-row>
           <v-row class="cell mt-12">
             <v-col :cols="12">
               <span style="font-size: 15px"> &nbsp; Endereço de Entrega</span>
             </v-col>
           </v-row>
           <v-row style="border-bottom: 1px solid #111320">
             <v-col :cols="5" class="cellSides">
               <b>Endereço:</b> {{selectedOrder.infos.addressName}}
             </v-col>
             <v-col :cols="2" class="cellSides">
               <b>Número:</b> {{selectedOrder.infos.addressNumber}}
             </v-col>
             <v-col :cols="2" class="cellSides">
               <b>Cidade:</b> {{selectedOrder.infos.addressCity}}
             </v-col>
             <v-col :cols="2" class="cellSides">
               <b>Estado:</b> {{selectedOrder.infos.addressState}}
             </v-col>
             <v-col :cols="1" class="cellSides">
               <b>CEP:</b> {{selectedOrder.infos.addressZipCode}}
             </v-col>
           </v-row>
         </div>
       </v-card>
     </v-dialog>
 </v-container>
</template>

<script>
import TransportOrderService from '@/service/transport.order.service'
export default {
  name: 'TransportOrders',
  data () {
    return {
      fetchedOrders: [],
      selectedOrder: null,
      viewDialogOpen: false
    }
  },
  mounted () {
    this.getOrders()
  },
  filters: {
    currencyLong (val) {
      if (val == null) return 'R$0,00'
      const str = val.toString()
      const decimals = str.substr(str.length - 2)
      const fulls = str.substr(0, str.length - 2)
      return 'R$' + fulls + ',' + decimals
    }
  },
  methods: {
    async getOrders () {
      const response = await new TransportOrderService(this).getTransportOrders()
      if (response.data != null) {
        this.fetchedOrders = response.data
        this.fetchedOrders.map(fo => {
          if (fo.sale != null && fo.sale.code != null) {
            fo.sale.code.code = '#' + fo.sale.code.code
          }
        })
      }
    },
    openViewDialog (order) {
      if (order != null) {
        console.log(order)
        this.selectedOrder = order
        this.viewDialogOpen = true
      }
    }
  }
}
</script>

<style scoped>
  .cell {
    border: 2px solid #111320;
  }
  .grey-back{
    background-color: #e9e7e7;
  }
  .cellSides {
    border-width: 0 1px 0 1px;
    border-color: #111320;
    border-style: solid;
  }
</style>
