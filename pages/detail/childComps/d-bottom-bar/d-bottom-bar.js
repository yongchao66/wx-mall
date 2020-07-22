
Component({
  options: {
    addGlobalClass: true
  },
  methods: {
    addcart() {
      this.triggerEvent('addcart')
    }
  }
})
