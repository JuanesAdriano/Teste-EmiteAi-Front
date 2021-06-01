<template>
  <v-container>
    <v-row>
      <v-col :offset="9" :xs="3">
        <v-btn @click="goToNewSale()" color="deep-purple darken-1" dark width="80%"><v-icon>mdi-plus</v-icon> Novo Pedido</v-btn>
      </v-col>
    </v-row>
    <v-row >
      <v-col :xs="11">
        <v-data-table
          :headers="tableHeaders"
          :items="sales"
          sort-by="code"
          class="elevation-1"
          item-key="id"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SaleService from '@/service/sale.service'

export default {
  name: 'Sales',
  data () {
    return {
      sales: [],
      tableHeaders: [
        { text: 'Cod', align: 'center', value: 'code.code', width: '90' },
        { text: 'Valor', align: 'center', value: 'saleValueStr' },
        { text: 'Cliente', value: 'clientName' }
      ]
    }
  },
  mounted () {
    this.getSales()
  },
  methods: {
    async getSales () {
      const response = await new SaleService(this).getSales()
      if (response.data != null) {
        this.sales = response.data
        this.sales.map(fs => {
          fs.saleValueStr = this.$formatLongCurrency(fs.saleValue)
        })
      }
      console.log(response.data)
    },
    goToNewSale () {
      this.$router.push('/createsale')
    }
  }
}
</script>

<style scoped>

</style>
