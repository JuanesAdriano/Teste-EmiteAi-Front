<template>
  <v-dialog v-model="visible" v-click-outside="close" width="600">
    <v-card >
      <v-card-title class="headline red lighten-1">
        <v-icon color="grey lighten-4 ">mdi-alert-circle</v-icon> <span class="ml-2 grey--text text--lighten-4">{{title}} :</span>
      </v-card-title>
      <v-card-text  >
        <p style="font-size: 18px; color: #060606; margin-top: 5px">{{message}}</p>
      </v-card-text>
      <v-card-actions class="justify-end" >
        <v-btn color="error"  @click="close">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ErrorDialog',
  data () {
    return {
      dialogsService: this.$dialogs,
      visible: this.$dialogs.isErrorVisible(),
      title: this.$dialogs.errorDialog.title,
      message: this.$dialogs.errorDialog.message
    }
  },
  watch: {
    'dialogsService.errorOn' () {
      this.getMessage()
      this.getTitle()
      this.visible = this.$dialogs.isErrorVisible()
    }
  },
  methods: {
    getTitle () {
      this.title = this.$dialogs.errorDialog.title
    },
    getMessage () {
      this.message = this.$dialogs.errorDialog.message
    },
    close () {
      this.visible = false
      this.$dialogs.closeError()
    }
  }
}
</script>

<style scoped>

</style>
