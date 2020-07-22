Component({
	options: {
    addGlobalClass: true
	},
	properties: {
		cateSub: {
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
