<template>
  <v-container class="mt-3">
    <v-spacer><span class="subtitle-1">Dados do Cliente</span></v-spacer>
    <v-row>
      <v-col :cols="6">
        <v-text-field
          v-model="clientName"
          label="Nome"
          :rules="nameRule"
          required
        ></v-text-field>
      </v-col>
      <v-col :cols="2">
        <v-text-field
          v-model="clientDocument"
          label="Documento"
          :rules="docRule"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-spacer><span class="subtitle-1">Endereço</span></v-spacer>
    <v-row>
      <v-col :cols="4">
        <v-text-field
          v-model="addressName"
          label="Nome do endereço"
          :rules="addressRule"
          required></v-text-field>
      </v-col>
      <v-col :cols="2">
        <v-text-field
          v-model="addressNumber"
          label="Número"
          ></v-text-field>
      </v-col>
      <v-col :cols="2">
        <v-text-field
          v-model="addressCity"
          label="Cidade"
          :rules="cityRule"
          required></v-text-field>
      </v-col>
      <v-col :cols="2">
        <v-text-field
          v-model="addressState"
          label="Estado"
          :rules="stateRule"
          required>
        </v-text-field>
      </v-col>
      <v-col :cols="2">
        <v-text-field
          v-model="addressZipCode"
          label="CEP"
          :rules="zipcodeRule"
          required>
        </v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-spacer><span class="subtitle-1">Produtos</span></v-spacer>
    <v-row>
      <v-col :cols="3">
        <v-autocomplete
         v-model= "selectProducts"
         label="Pesquisar Produto"
         no-data-text="Nenhum produto encontrado"
         :items="queriedProducts"
         item-text="name"
         return-object
         :search-input.sync="searchProducts"
        @input="setProduct">
        >
          <template slot="selection" slot-scope="data">
            {{data.item.name}} - {{selectProducts.unitaryPrice | currencyLong}}
          </template>
          <template slot="item" slot-scope="data">
            {{data.item.name}} - {{data.item.unitaryPrice | currencyLong}}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col :cols="1">
        <v-text-field
          v-if="addingProduct != null"
          v-model="addingProduct.amount"
          :rules="amountRule"
          label="Unidades"
        type="number"
        >
        </v-text-field>
      </v-col>
      <v-col :cols="2">
        <v-btn color="green lighten-1" class="mt-4" dark
               :disabled="addingProduct == null || addingProduct.amount == null || addingProduct.amount < 1"
               @click="addProduct">
          <v-icon>mdi-plus</v-icon>Adicionar
        </v-btn>
      </v-col>
      <v-col :offset="4" :cols="2">
        <h4>Total: {{getSaleTotalPrice()}}</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col :xs="8">
        <v-data-table
        :headers="productTableHeaders"
        :items="addedProducts"
        class="elevation-1"
        no-data-text="Nenhum produto Adicionado"
        hide-default-footer
        >
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col :offset="10" :cols="2">
        <v-btn color="green lighten-3"  :disabled="!canFinish()" @click="finishSale()" >Finalizar Pedido</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductService from '@/service/product.service'
import SaleService from '@/service/sale.service'

export default {
  name: 'CreateSale',
  data () {
    return {
      clientName: '',
      clientDocument: '',
      addressName: '',
      addressNumber: '',
      addressCity: '',
      addressState: '',
      addressZipCode: '',
      selectProducts: '',
      queriedProducts: [],
      productCompleteName: '',
      searchProducts: null,
      addingProduct: null,
      addedProducts: [],
      productTableHeaders: [
        { text: 'Nome', align: 'center', value: 'product.name', width: '150' },
        { text: 'Valor UN', align: 'center', value: 'unitaryPrice' },
        { text: 'Valor total', align: 'center', value: 'totalValue' },
        { text: 'Qtd', align: 'center', value: 'amount' }
      ],
      nameRule: [
        v => !!v || 'Nome do cliente precisa ser preenchido'
      ],
      docRule: [
        v => !!v || 'documento precisa ser preenchido'
      ],
      cityRule: [
        v => !!v || 'Cidade precisa ser preenchido'
      ],
      stateRule: [
        v => !!v || 'Estado precisa ser preenchido'
      ],
      addressRule: [
        v => !!v || 'Endereço precisa ser preenchido'
      ],
      zipcodeRule: [
        v => !!v || 'CEP precisa ser preenchido'
      ],
      amountRule: [
        v => !!v || 'Preencha a Quantidade!',
        v => (v && v > 0) || 'Escolha menos uma unidade!'
      ]
    }
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
  watch: {
    searchProducts (val) {
      if (val != null) {
        this.queryProducts(val)
      }
    }
  },
  methods: {
    async queryProducts (val) {
      const response = await new ProductService(this).getProducts(val.trim())
      if (response.data != null) {
        this.queriedProducts = response.data
      }
    },
    setProduct () {
      this.addingProduct = {
        product: this.selectProducts,
        amount: 1
      }
    },
    addProduct () {
      if (this.addingProduct != null) {
        this.addedProducts.push({
          product: this.addingProduct.product,
          unitaryPrice: this.formatLongPrice(this.addingProduct.product.unitaryPrice),
          amount: this.addingProduct.amount,
          totalValue: this.formatLongPrice(this.addingProduct.product.unitaryPrice * this.addingProduct.amount)
        })
        this.addingProduct = null
        this.selectProducts = null
        this.queriedProducts = []
      }
    },
    formatLongPrice (val) {
      return this.$formatLongCurrency(val)
    },
    getSaleTotalPrice () {
      if (this.addedProducts == null || this.addedProducts.length === 0) return 'R$0,00'
      let total = 0
      this.addedProducts.map(ap => {
        total += ap.product.unitaryPrice * ap.amount
      })
      return this.formatLongPrice(total)
    },
    canFinish () {
      if (this.clientName == null ||
        this.clientDocument == null ||
        this.addressName == null ||
        this.addressState == null ||
        this.addressZipCode == null ||
        this.addressCity == null) return false
      return !(this.addedProducts == null || this.addedProducts.length < 1)
    },
    async finishSale () {
      if (this.canFinish()) {
        const savingSale = this.mountSaleSetup()
        console.log('>>setup:', savingSale)
        const response = await new SaleService(this).createSale(savingSale)
        if (response.data != null) {
          console.log(response.data)
          await this.$router.push('/')
        }
      }
    },
    mountSaleSetup () {
      const saleProducts = []
      this.addedProducts.map(ap => {
        saleProducts.push({
          productId: ap.product.id,
          amount: ap.amount
        })
      })
      const orderData = {
        infos: {
          clientName: this.clientName.trim(),
          document: this.clientDocument.trim(),
          addressName: this.addressName.trim(),
          addressNumber: this.addressNumber,
          addressCity: this.addressCity.trim(),
          addressState: this.addressState.trim(),
          addressZipCode: this.addressZipCode.trim()
        }
      }
      return {
        productsAmount: saleProducts,
        transportOrder: orderData
      }
    }
  }
}
</script>

<style scoped>

</style>
