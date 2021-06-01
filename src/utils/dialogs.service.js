export default {
  errorOn: false,

  errorDialog: {
    title: 'Erro!',
    message: 'Ops..'
  },

  isErrorVisible () {
    return this.errorOn
  },

  showError (message) {
    if (message != null && message.trim() !== '') {
      this.errorDialog.message = message
    }
    this.errorOn = true
  },

  closeError () {
    this.errorOn = false
    this.errorDialog.message = 'Ops..'
  }
}
