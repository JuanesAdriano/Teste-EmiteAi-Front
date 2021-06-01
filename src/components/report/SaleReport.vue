<template>
  <v-container class="mt-3">
    <v-row justify="center">
      <v-col :cols="3"><h4>Buscar Pedidos com valor maior a <i>R$500</i></h4></v-col>
    </v-row>
    <v-row >
      <v-col :cols="2">
        <v-btn color="indigo lighten-1" dark>Consultar </v-btn>
      </v-col>
      <v-col :offset="8" :cols="2">
        <v-btn @click="downloadReport"  dark color="grey darken-2">Exportar como CSV</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <v-simple-table class="blue-gre darken-4"
        >
          <thead>
          <tr>
            <th class="text-left">
              Código
            </th>
            <th class="text-left">
              Valor
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="sale in fetchedResults" :key="sale.code">
            <td>{{sale.code}}</td>
            <td>{{sale.saleValue}}</td>
          </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SaleService from '@/service/sale.service'

export default {
  name: 'SaleReport',
  data () {
    return {
      fetchedResults: [],
      tableHeaders: [
        { text: 'Código', align: 'center', value: 'code', width: '150' },
        { text: 'Valor da Venda', align: 'center', value: 'saleValue', width: '150' }
      ]
    }
  },
  mounted () {
    this.getReportData()
  },
  methods: {
    async getReportData () {
      const response = await new SaleService(this).getReportSales()
      if (response.data) {
        this.fetchedResults = response.data
        this.fetchedResults.map(fr => {
          fr.code = '#' + fr.code
        })
      }
    },
    downloadReport () {
      if (this.fetchedResults != null && this.fetchedResults.length > 0) {
        const reportData = []
        this.fetchedResults.forEach(fr => {
          reportData.push({
            CODIGO: fr.code,
            VALOR: fr.saleValue
          })
        })
        const csvBlob = new Blob([this.toCSV(reportData)], {
          type: 'text/plain; encoding=utf8'
        })
        console.log('REPORT!')
        const download = document.createElement('a')
        document.lastChild.appendChild(download)
        download.style = 'display: none'
        const url = window.URL.createObjectURL(csvBlob)
        download.href = url
        download.download = 'consulta_pedidos500+.csv'
        download.click()
        window.URL.revokeObjectURL(url)
      }
    },
    toCSV (json) {
      const replacer = (key, value) => (value == null ? '' : value)
      const header = Object.keys(json[0])
      let csv = json.map(row =>
        header
          .map(fieldName => JSON.stringify(row[fieldName], replacer))
          .join(';')
      )
      csv.unshift(header.join(';'))
      csv = csv.join('\r\n')

      return csv
    }
  }
}
</script>

<style scoped>

</style>
