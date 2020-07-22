Component({
	options: {
    addGlobalClass: true
	},
	properties: {
		recommends: {
			type: Array,
			value: []
		}
	},
  methods: {
    imgLoad() {
      this.triggerEvent('imageLoad')
    }
  }
})
